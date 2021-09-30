<script>
	import { load_course_meta, load_tasks, load_user_meta } from '$lib/api/calls';

	import ComplexView from '$lib/components/tasks/complex/ComplexView.svelte';
	import LoadingWrapper from '$lib/components/ui/LoadingWrapper.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import course from '$lib/stores/course';
	import tasks from '$lib/stores/tasks';
	import user from '$lib/stores/user';
	import { onMount } from 'svelte';

	let isLoading = true;
	onMount(async () => {
		if ($user.activeCourse == undefined) await load_user_meta();
		if ($course.config == undefined) await load_course_meta($user.activeCourse);
		if ($tasks.length == 0) await load_tasks($user.activeCourse);
		isLoading = false;
	});
</script>

<LoadingWrapper {isLoading}>
	<TransitionWrapper>
		<div class="h-full p-4">
			<div class="pt-1 border-2 rounded-md border-gray-300 h-full overflow-y-auto shadow-md">
				<ComplexView tasks={$tasks} />
			</div>
		</div>
	</TransitionWrapper>
</LoadingWrapper>
