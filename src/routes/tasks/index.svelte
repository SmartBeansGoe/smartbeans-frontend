<script>
	import LoadingWrapper from '../../components/layout/LoadingWrapper.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import BezierEasing from 'bezier-easing';
	import fadeScale from 'svelte-transitions-fade-scale';
	import { axiosInstance } from '../../auth/auth';
	import tasks from '../../stores/tasks';

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
	<div
		in:fadeScale={{
			delay: 90,
			duration: 210,
			baseScale: 0.92,
			easing: BezierEasing(0, 0, 0.2, 1.0)
		}}
		out:fade={{ duration: 90, easing: BezierEasing(0.4, 0, 1, 1) }}
		class="overflow-y h-screen"
	>
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
	</div>
</LoadingWrapper>
