<script>
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import { page } from '$app/stores';
	import TaskItemTitleBar from '$lib/components/tasks/TaskItemTitleBar.svelte';
	import TaskItem from '$lib/components/tasks/TaskItem.svelte';
	import {
		course,
		courseLoading,
		progress,
		progressLoading,
		tasks,
		tasksLoading
	} from '$lib/stores/stores';
	import { taskPrerequisitesFulfilled } from '$lib/utils/tasks';

	$: isLoading = $courseLoading || $progressLoading || $tasksLoading;
	let groupedTasks = {};
	let categories = [];

	$: if ($page.query.getAll('category').length > 0) {
		categories = $page.query.getAll('category');
	} else if ($course.config != undefined) {
		categories = $course.config.tasks.standardView.categorizeByTags;
	}
	$: if ($tasks && categories) {
		$tasks.forEach((task) => {
			task.tags
				.filter((tag) => categories.includes(tag.name))
				.map((tag) => {
					if (!groupedTasks[tag.name]) {
						groupedTasks[tag.name] = [];
					}
					groupedTasks[tag.name].push(task);
				});
		});
	}

	$: categoriesShown = Object.keys(groupedTasks);
	$: categoriesShownLength = categoriesShown.filter((c) => c != 'filtered-out').length;
</script>

<svelte:head><title>Aufgaben - SmartBeans</title></svelte:head>

<LoadingWrapper {isLoading}>
	<TransitionWrapper>
		<div class="h-full p-4">
			<div class="pr-0.5 h-full overflow-y-auto">
				<div class="grid grid-cols-1 md:grid-cols-2 content-around gap-4">
					{#each categoriesShown as category}
						{#if category != 'filtered-out'}
							<div class="box {categoriesShownLength > 1 ? '' : 'col-span-2'}">
								<TaskItemTitleBar
									title={category}
									solvedNum={groupedTasks[category]
										.map((task) => ($progress.includes(task.taskid) ? 1 : 0))
										.reduce((acc, val) => acc + val, 0)}
									maxNum={groupedTasks[category].length}
								/>
								{#if categoriesShownLength > 1}
									{#each groupedTasks[category] as task}
										<div class="pb-0.5">
											<TaskItem
												{task}
												disabled={!$progress.includes(task.taskid) &&
													!taskPrerequisitesFulfilled(task, $progress)}
												solved={$progress.includes(task.taskid)}
											/>
										</div>
									{/each}
								{:else}
									<div class="grid xl:grid-cols-2 gap-x-2">
										{#each groupedTasks[category] as task, i}
											{#if i % 2 == 0}
												<div class="xl:border-r-4 xl:pr-2">
													<TaskItem
														{task}
														disabled={!$progress.includes(task.taskid) &&
															!taskPrerequisitesFulfilled(task, $progress)}
														solved={$progress.includes(task.taskid)}
													/>
												</div>
											{:else}
												<div>
													<TaskItem
														{task}
														disabled={!$progress.includes(task.taskid) &&
															!taskPrerequisitesFulfilled(task, $progress)}
														solved={$progress.includes(task.taskid)}
													/>
												</div>
											{/if}
										{/each}
									</div>
								{/if}
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</TransitionWrapper>
</LoadingWrapper>

<style lang="postcss">
	.box {
		@apply p-2 shadow-md bg-gray-100 rounded;
	}
</style>
