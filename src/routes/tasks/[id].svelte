<script>
	import { page } from '$app/stores';
	import { beforeUpdate, onMount } from 'svelte';
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
	import { toast } from '@zerodevx/svelte-toast';
	import NextExercise from '$lib/components/ui/NextExercise.svelte';
	import { getNextTask } from '$lib/utils/tasks';

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

	beforeUpdate(async () => {
		if (id != $page.params.id && $page.params.id != undefined) {
			id = $page.params.id;
			task = { ...$tasks.find((task) => task.taskid == id) };
			submissions = await load_task_submissions(await activeCourse(), id);
		}
	});

	async function handleSubmit(event) {
		if (!event.detail.isError) {
			if (event.detail.score >= 0.9999) {
				await getProgress();
				let nextTask = getNextTask($progress, $tasks);
				toast.push('Erfolgreiche Abgabe!<br/>Sehr gut! 👍', {
					theme: {
						'--toastBackground': '#10b981',
						'--toastBarBackground': '#059669'
					}
				});
				if (nextTask != undefined) {
					toast.push({
						component: {
							src: NextExercise,
							props: {
								taskid: nextTask.taskid,
								taskShortName: nextTask.task_description.shortname
							},
							duration: 4000
						},
						theme: {
							'--toastBackground': '#10b981',
							'--toastBarBackground': '#059669'
						},
						pausable: true,
						duration: 6000
					});
				}
			} else {
				toast.push('Falsche Antwort', {
					theme: {
						'--toastBackground': '#F56565',
						'--toastBarBackground': '#C53030'
					}
				});
			}
			submissions = await load_task_submissions($user.activeCourse, id);
		} else {
			let notificationText;
			if (event.detail.error.response != undefined)
				notificationText =
					event.detail.error.response.status + ': ' + event.detail.error.response.statusText;
			else notificationText = event.detail.error.message;

			toast.push(notificationText, {
				theme: {
					'--toastBackground': '#F56565',
					'--toastBarBackground': '#C53030'
				}
			});
		}
	}
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
					<TaskDescription task={task.task_description} solved={$progress.includes(task.taskid)} />
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
