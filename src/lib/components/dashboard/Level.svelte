<script>
	import { course, progress, tasks } from '$lib/stores/stores';

	let level;
	let maxLevel;

	let points = 0;
	let maxPoints = 0;

	$: if (course.config && $course.config.gamification.level.unit == 'points') {
		points = calculatePoints($progress, $tasks);
		level = calculateLevel(points, $course.config.gamification.level.levelSteps);
		maxLevel =
			$course.config.gamification.level.levelSteps[
				$course.config.gamification.level.levelSteps.length
			];
	} else {
		points = $progress.length;
		maxPoints = $tasks.length;
	}
	function calculateLevel(points, levelSteps) {
		return 0; // TODO
	}

	function calculatePoints(solvedTasks, tasks) {
		return 0; // TODO
	}
</script>

{#if $course.config}
	<div class="text-2xl font-bold">
		{#if $course.config.gamification.level.unit == 'points'}
			Level {level}/{$course.config.gamification.level.levelSteps.length}
		{:else}
			Fortschritt
		{/if}
	</div>

	<div class="pt-1">
		<div class="relative overflow-hidden h-6 mb-4 flex rounded-md bg-emerald-300 text-sm font-bold">
			<span style="width:{(points / maxPoints) * 100}%" class="bg-emerald-500" />
			<span class="absolute flex flex-wrap h-full w-full justify-center text-white content-center"
				>{points}/{maxPoints}
				{$course.config ? $course.config.gamification.level.unitName : ''}</span
			>
		</div>
	</div>
{/if}
