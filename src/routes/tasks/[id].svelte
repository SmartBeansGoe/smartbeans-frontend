<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { linear } from 'svelte/easing';
	import BezierEasing from 'bezier-easing';
	import { axiosInstance } from '../../auth/auth';
	import Editor from '../../components/tasks/Editor.svelte';
	import TaskDescription from '../../components/tasks/TaskDescription.svelte';
	import LoadingWrapper from '../../components/layout/LoadingWrapper.svelte';
	import tasks from '../../stores/tasks';

	let id;
	let task;
	let isLoading = true;
	let courseId = 1; // TODO course ID

	onMount(() => {
		// Loading taskID from URL
		id = $page.params.id;
		// Check taskID avaiable in tasks store.
		task = $tasks.find((task) => task.taskid == id);
		// If taskID not in task store try to load task from server
		if (task == undefined) {
			courseId = 1; // TODO course ID
			let axios_inst = axiosInstance();
			axios_inst
				.get('/courses/' + courseId + '/tasks/' + id)
				.then((res) => (task = res.data))
				// If taskID not avaiable then show error page (TODO)
				.catch((e) => {
					isLoading = false;
				});
		}
		isLoading = false;
	});
</script>

<LoadingWrapper {isLoading}>
	<div
		in:fade={{
			duration: 45,
			easing: linear
		}}
		class="p-4 content-around gap-4 overflow-y h-screen"
	>
		<div
			in:scale={{
				duration: 150,
				baseScale: 0.8,
				easing: BezierEasing(0, 0, 0.2, 1.0)
			}}
			out:fade={{ duration: 75, easing: linear }}
		>
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
				<div class="p-4 shadow-md bg-gray-100 rounded">
					<TaskDescription {task} />
				</div>
				<div class="p-1 shadow-md bg-gray-100 rounded">
					<Editor {id} {task} />
				</div>
			</div>
		</div>
	</div>
</LoadingWrapper>
