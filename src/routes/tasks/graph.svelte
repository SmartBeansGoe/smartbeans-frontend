<script>
	import ComplexView from '$lib/components/tasks/complex/ComplexView.svelte';
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import {
		getProgress,
		getTasks,
		progress,
		progressEmpty,
		progressLoading,
		tasks,
		tasksEmpty,
		tasksLoading
	} from '$lib/stores/stores';
	import { onMount } from 'svelte';

	$: isLoading = $progressLoading || $tasksLoading;
	onMount(async() => {
		if (tasksEmpty()) await getTasks();
		if (progressEmpty()) await getProgress();
	});
</script>

<LoadingWrapper {isLoading}>
	<TransitionWrapper>
		<div class="h-full p-4">
			<div class="pt-1 border-2 rounded-md border-gray-300 bg-gray-100 h-full overflow-y-auto shadow-md">
				<ComplexView tasks={$tasks} progress={$progress} />
			</div>
		</div>
	</TransitionWrapper>
</LoadingWrapper>
