<script>
	import { page } from '$app/stores';
	import { load_tasks, load_user_meta } from '$lib/api/calls';
	import TaskItem from '$lib/components/tasks/TaskItem.svelte';
	import TaskItemTitleBar from '$lib/components/tasks/TaskItemTitleBar.svelte';
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import user from '$lib/stores/user';
	import { onMount } from 'svelte';

	import tasks from '$lib/stores/tasks';

	let isLoading = $tasks.length == 0;

	onMount(async () => {
		if (isLoading) {
			let isReload = $user.length == 0;
			if (isReload) await load_user_meta();
			await load_tasks($user.activeCourse.name);
		}
	});
	$: category = $page.query.get('c');
	$: categoryTasks = $tasks.filter((x) => x.categories.includes(category));
</script>

<LoadingWrapper {isLoading}>
	{#if category != null}
		{#key category}
			<TransitionWrapper>
				<div class="h-full p-4">
					<div class="pr-0.5 h-full overflow-y-auto">
						<div class="box">
							<TaskItemTitleBar
								title={category}
								solvedNum={categoryTasks.filter((t) => t.solved).length}
								maxNum={categoryTasks.length}
							/>
							<div class="grid xl:grid-cols-2 gap-x-2">
								{#each categoryTasks as task, i}
									{#if i % 2 == 0}
										<div class="xl:border-r-4 xl:pr-2"><TaskItem {task} /></div>
									{:else}
										<div><TaskItem {task} /></div>
									{/if}
								{/each}
							</div>
						</div>
					</div>
				</div>
			</TransitionWrapper>
		{/key}
	{/if}
</LoadingWrapper>

<style lang="postcss">
	.box {
		@apply p-4 shadow-md bg-gray-100 rounded;
	}
</style>
