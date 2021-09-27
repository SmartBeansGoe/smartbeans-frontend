<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import BezierEasing from 'bezier-easing';
	import Editor from '$lib/components/tasks/taskpage/Editor.svelte';
	import TaskDescription from '$lib/components/tasks/taskpage/TaskDescription.svelte';
	import tasks from '$lib/stores/tasks';
	import Split from 'split.js';
	import Submissions from '$lib/components/tasks/taskpage/Submissions.svelte';
	import { load_task, load_task_submissions, load_user_meta } from '$lib/api/calls';
	import user from '$lib/stores/user';
	import course from '$lib/stores/course';

	let id;
	let task;
	let submissions = [];
	let errorCode;
	let isLoading = true;

	onMount(async () => {
		id = $page.params.id;
		task = $tasks.find((task) => task.taskid == id);
		if (task == undefined) {
			await load_user_meta(); // Load user meta data, needed for activeCourse.name (courseId)
			await load_task($user.activeCourse, id)
				.then((res) => (task = res.data))
				.catch((err) => {
					errorCode = err.response.status;
				});
		}

		if (errorCode == undefined || errorCode < 400) {
			Split(['#split-0', '#split-1']);
			Split(['#split-2', '#split-3'], {
				direction: 'vertical'
			});
		}
		isLoading = false;
	});

	$: taskDescription = task && !errorCode ? task.task_description : undefined;
</script>

<div
	in:fade={{
		duration: 45,
		easing: linear
	}}
	class="p-4 content-around gap-4 h-full"
>
	<div
		in:scale={{
			duration: 150,
			baseScale: 0.8,
			easing: BezierEasing(0, 0, 0.2, 1.0)
		}}
		out:fade={{ duration: 75, easing: linear }}
		class="h-full box"
	>
		<div class="split h-full">
			{#if errorCode == undefined || errorCode < 400}
				<div class="h-full" id="split-0">
					<div class="overflow-y-auto h-5/6 p-4" id="split-2">
						{#if !isLoading}
							<TaskDescription task={taskDescription} />
						{/if}
					</div>
					<div class="overflow-y-auto h-1/6" id="split-3">
						{#if !isLoading}
							<Submissions {submissions} />
						{/if}
					</div>
				</div>
				<div id="split-1">
					{#if !isLoading}
						<Editor
							{task}
							courseId={$course.name}
							on:submit={async () => submissions = await load_task_submissions($course.name, task.taskid)}
						/>
					{/if}
				</div>
			{:else}
				<div class="h-full w-full flex flex-wrap justify-center content-center">
					<p class="text-xl font-bold">
						Task {id} not found!
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded;
	}
	.split {
		display: flex;
		flex-direction: row;
	}

	:global(.gutter) {
		background-color: #eee;
		background-repeat: no-repeat;
		background-position: 50%;
	}

	:global(.gutter.gutter-horizontal) {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
		cursor: col-resize;
	}
	:global(.gutter.gutter-vertical) {
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
		cursor: row-resize;
	}
</style>
