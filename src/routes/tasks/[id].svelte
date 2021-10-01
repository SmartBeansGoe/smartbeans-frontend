<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import BezierEasing from 'bezier-easing';
	import Editor from '$lib/components/tasks/taskpage/Editor.svelte';
	import TaskDescription from '$lib/components/tasks/taskpage/TaskDescription.svelte';
	import Submissions from '$lib/components/tasks/taskpage/Submissions.svelte';
	import { activeCourse, load_task_submissions } from '$lib/api/calls';
	import {
		user,
		tasks,
		userLoading,
		tasksLoading,
		course,
		tasksEmpty,
		getTasks,
		getProgress,
		progress
	} from '$lib/stores/stores';
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import Splitter from '$lib/components/tasks/taskpage/Splitter.svelte';

	let submissions = [];
	let id;
	let task;
	let submissionsLoading = true;

	$: isLoading = $userLoading || $tasksLoading || submissionsLoading;
	
	onMount(async () => {
		if (tasksEmpty()) await getTasks();
		id = $page.params.id;
		task = $tasks.find((task) => task.taskid == id);
		submissions = await load_task_submissions(await activeCourse(), id);
		submissionsLoading = false;
	});

	async function handleSubmit() {
		submissions = await load_task_submissions($user.activeCourse, id);
		getProgress();
	}

	$: taskDescription = task != undefined ? task.task_description : undefined;
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
		{#if task != undefined}
			<Splitter>
				{#if !isLoading}
					<TaskDescription task={taskDescription} solved={$progress.includes(task.taskid)} />
				{/if}
				<svelte:fragment slot="submissions">
					{#if !isLoading}
						<Submissions {submissions} />
					{/if}
				</svelte:fragment>
				<svelte:fragment slot="editor">
					{#if !isLoading}
						<Editor {id} {task} courseId={$course.name} on:submit={handleSubmit} />
					{/if}
				</svelte:fragment>
			</Splitter>
		{:else if isLoading}
			<div class="w-full h-full"><LoadingWrapper {isLoading} /></div>
		{:else}
			<div class="h-full w-full flex flex-wrap justify-center content-center">
				<p class="text-xl font-bold">
					Task {id} not found!
				</p>
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded;
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
