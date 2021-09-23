<script>
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import { onMount } from 'svelte';
	import tasks from '$lib/stores/tasks';
	import TransitionRootPageWrapper from '$lib/components/ui/transitions/TransitionRootPageWrapper.svelte';
	import TaskItem from '$lib/components/tasks/TaskItem.svelte';
	import TaskItemTitleBar from '$lib/components/tasks/TaskItemTitleBar.svelte';
	import user from '$lib/stores/user';
	import { load_tasks, load_user_meta } from '$lib/api/calls';

	let isLoading = true;
	onMount(async () => {
		let isReload = $user.length == 0;
		if (isReload) await load_user_meta();
		await load_tasks($user.activeCourse);
		isLoading = false;
	});

	$: groupedTasks = $tasks.reduce((acc, value) => {
		if (!acc[value.difficulty]) {
			acc[value.difficulty] = [];
		}
		acc[value.difficulty].push(value);
		return acc;
	}, {});
	$: categories = Object.keys(groupedTasks);
</script>

<LoadingWrapper {isLoading}>
	<TransitionRootPageWrapper>
		<div class="h-full p-4">
			<div class="pr-0.5 h-full overflow-y-auto">
				<div class="grid grid-cols-1 md:grid-cols-2 content-around gap-4">
					{#each categories as category}
						<div class="box">
							<TaskItemTitleBar
								title={category}
								solvedNum={groupedTasks[category].filter((t) => t.solved).length}
								maxNum={groupedTasks[category].length}
							/>
							{#each groupedTasks[category] as task}
								<TaskItem {task} />
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</TransitionRootPageWrapper>
</LoadingWrapper>

<style lang="postcss">
	.box {
		@apply p-2 shadow-md bg-gray-100 rounded;
	}
</style>
