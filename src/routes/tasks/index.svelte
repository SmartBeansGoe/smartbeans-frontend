<script>
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import { onMount } from 'svelte';
	import tasks from '$lib/stores/tasks';
	import TransitionRootPageWrapper from '$lib/components/ui/transitions/TransitionRootPageWrapper.svelte';
	import user from '$lib/stores/user';
	import { load_course_meta, load_tasks, load_user_meta } from '$lib/api/calls';
	import { page } from '$app/stores';
	import course from '$lib/stores/course';
	import TaskItemTitleBar from '$lib/components/tasks/TaskItemTitleBar.svelte';
	import TaskItem from '$lib/components/tasks/TaskItem.svelte';

	let isLoading = true;
	let groupedTasks = {};
	let categories = [];

	onMount(async () => {
		if ($user.activeCourse == undefined) await load_user_meta();
		if ($course.config == undefined) await load_course_meta($user.activeCourse);
		if ($tasks.length == 0) await load_tasks($user.activeCourse);
		// await load_progess($user.activeCourse)
		isLoading = false;
	});

	$: if ($page.query.getAll('category').length > 0) {
		categories = $page.query.getAll('category');
	} else if ($course.config != undefined) {
		categories = $course.config.tasks.standardView.sortingByTags;
	}
	$: groupedTasks = $tasks.reduce((acc, value) => {
		let tags = value.tags.filter((tag) => categories.includes(tag.name));
		if (tags.length == 0) {
			if (!acc['filtered-out']) {
				acc['filtered-out'] = [];
			}
			acc['filtered-out'].push(value);
			return acc;
		}
		if (!acc[tags[0].name]) {
			acc[tags[0].name] = [];
		}
		acc[tags[0].name].push(value);
		return acc;
	}, {});

	$: categoriesShown = Object.keys(groupedTasks);
	$: categoriesShownLength = categoriesShown.filter((c) => c != 'filtered-out').length;
</script>

<LoadingWrapper {isLoading}>
	<TransitionRootPageWrapper>
		<div class="h-full p-4">
			<div class="pr-0.5 h-full overflow-y-auto">
				<div class="grid grid-cols-1 md:grid-cols-2 content-around gap-4">
					{#each categoriesShown as category}
						{#if category != 'filtered-out'}
							<div class="box {categoriesShownLength > 1 ? '' : 'col-span-2'}">
								<TaskItemTitleBar
									title={category}
									solvedNum={0}
									maxNum={groupedTasks[category].length}
								/>
								{#if categoriesShownLength > 1}
									{#each groupedTasks[category] as task}
										<TaskItem {task} />
									{/each}
								{:else}
									<div class="grid xl:grid-cols-2 gap-x-2">
										{#each groupedTasks[category] as task, i}
											{#if i % 2 == 0}
												<div class="xl:border-r-4 xl:pr-2"><TaskItem {task} /></div>
											{:else}
												<div><TaskItem {task} /></div>
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
	</TransitionRootPageWrapper>
</LoadingWrapper>

<style lang="postcss">
	.box {
		@apply p-2 shadow-md bg-gray-100 rounded;
	}
</style>
