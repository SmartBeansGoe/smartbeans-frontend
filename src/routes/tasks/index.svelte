<script>
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import { onMount, tick } from 'svelte';
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
		await load_user_meta();
		await load_course_meta($user.activeCourse);
		await load_tasks($user.activeCourse);

		isLoading = false;
	});

	$: {
		if ($page.query.getAll('category').length > 0) {
			categories = $page.query.getAll('category');
		} else {
			categories = $course.config.tasks.standardView.sortingByTags;
		}

		groupedTasks = $tasks.reduce((acc, value) => {
			let tags = value.tags.filter((tag) => categories.includes(tag));
			if (tags[0] == undefined)
				return acc;
			if (!acc[tags[0]]) {
				acc[tags[0]] = [];
			}
			acc[tags[0]].push(value);
			return acc;
		}, {});

	}
	$: categoriesShown = Object.keys(groupedTasks);
</script>

<LoadingWrapper {isLoading}>
	<TransitionRootPageWrapper>
		<div class="h-full p-4">
			<div class="pr-0.5 h-full overflow-y-auto">
				<div class="grid grid-cols-1 md:grid-cols-2 content-around gap-4">
					{#each categoriesShown as category}
						<div class="box">
							<TaskItemTitleBar
								title={category}
								solvedNum={0}
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
