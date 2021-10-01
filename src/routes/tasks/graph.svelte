<script>
	import ComplexView from '$lib/components/tasks/complex/ComplexView.svelte';
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import { progress, progressLoading, tasks, tasksLoading } from '$lib/stores/stores';

	$: isLoading = $progressLoading || $tasksLoading;
</script>

<TransitionWrapper>
	<LoadingWrapper {isLoading}>
		<div class="h-full p-4">
			<div class="border-2 rounded-md border-gray-300 bg-gray-100 h-full overflow-y-auto shadow-md">
				<div class="h-full p-2">
					<ComplexView tasks={$tasks} progress={$progress} />
				</div>
			</div>
		</div>
	</LoadingWrapper>
</TransitionWrapper>
