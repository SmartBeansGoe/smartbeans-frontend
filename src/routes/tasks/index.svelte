<script>
	import LoadingWrapper from '../../components/layout/LoadingWrapper.svelte';
	import { onMount } from 'svelte';
	import { axiosInstance } from '../../auth/auth';
	import tasks from '../../stores/tasks';
	import TransitionRootPageWrapper from '../../components/layout/transitions/TransitionRootPageWrapper.svelte';

	let isLoading = $tasks.length == 0;

	onMount(() => {
		if (isLoading)
			axiosInstance()
				.get('/tasks')
				.then((res) => {
					tasks.set(res.data);
					isLoading = false;
				})
				.catch((error) => {
					console.log(error);
				});
	});
</script>

<LoadingWrapper {isLoading}>
	<TransitionRootPageWrapper>
		<div class="p-4 grid grid-cols-1 md:grid-cols-2 content-around gap-4">
			<div class="box">
				{#each $tasks as task}
					<div>
						<span><a href="/tasks/{task.taskid}">{task.name}</a></span>
						{#each task.categories as skill}
							<span
								class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1 hover:bg-indigo-300 hover: text-indigo-600 hover:cursor-pointer"
								>{skill}</span
							>
						{/each}
					</div>
				{/each}
			</div>
			<div class="box" />
			<div class="box" />
		</div>
	</TransitionRootPageWrapper>
</LoadingWrapper>
