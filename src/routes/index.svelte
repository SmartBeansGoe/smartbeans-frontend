<script>
	import SkillGraph from '$lib/components/dashboard/SkillGraph.svelte';
	import Level from '$lib/components/dashboard/Level.svelte';
	import Achievements from '$lib/components/dashboard/Achievements.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import { course, getCourse } from '$lib/stores/stores';
	import { onMount } from 'svelte';
	import NextExercise from '$lib/components/dashboard/NextExercise.svelte';

	let levelActive;
	let achievementsActive;
	let skillsActive;

	$: if ($course.config) {
		levelActive = $course.config.gamification.level.onDashboard;
		achievementsActive = $course.config.gamification.achievements.onDashboard;
		skillsActive = $course.config.gamification.skillgraph.onDashboard;
	}

	onMount(async () => {
		if ($course.length == 0) getCourse();
	});
</script>

<svelte:head><title>Dashboard - SmartBeans</title></svelte:head>

<TransitionWrapper>
	<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
		{#if levelActive}
			<div class="box"><Level /></div>
		{/if}
		{#if achievementsActive}
			<div class="box"><Achievements /></div>
		{/if}
		<div class="box"><NextExercise /></div>
		{#if skillsActive}
			<div class="box"><SkillGraph /></div>
		{/if}
	</div>
</TransitionWrapper>

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded min-h-32;
	}
</style>
