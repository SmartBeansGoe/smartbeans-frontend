<script>
	import { taskPrerequisitesFulfilled } from '$lib/utils/tasks';
	import TaskItem from '../TaskItem.svelte';

	export let tasks;
	export let progress;
	export let links;
	export let key;

	function hightlightLinksTo(target) {
		const linkToHighlight = links.filter((link) => link.target == target);
		linkToHighlight.forEach((link) => {
			let linkPath = document.getElementById(`s${link.source}t${link.target}`);
			linkPath.setAttribute('stroke-width', '5px');
			let color = progress.includes(link.source) ? '#10B981' : '#EF4444';
			linkPath.setAttribute('stroke', color);

			let linkSVG = document.getElementById(`s${link.source}t${link.target}-svg`);
			linkSVG.style['z-index'] = 2;
		});
	}
	function deHightlightLinksTo(target) {
		const linkToDeHighlight = links.filter((link) => link.target == target);
		linkToDeHighlight.forEach((link) => {
			let linkPath = document.getElementById(`s${link.source}t${link.target}`);
			linkPath.setAttribute('stroke-width', '2px');
			let color = progress.includes(link.source) ? '#6EE7B7' : '#FCA5A5';
			linkPath.setAttribute('stroke', color);

			let linkSVG = document.getElementById(`s${link.source}t${link.target}-svg`);
			linkSVG.style['z-index'] = 0;
		});
	}
</script>

{#each tasks as task, i (task.taskid)}
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div
		id="taskid:{task.taskid}"
		class="absolute m-1 box w-64 max-w-64 max-h-24 z-index-1"
		style="top: {7 * i}rem;left: {21 * key}rem;"
		on:mouseover={() => hightlightLinksTo(task.taskid)}
		on:mouseout={() => deHightlightLinksTo(task.taskid)}
	>
		<TaskItem
			{task}
			solved={progress.includes(task.taskid)}
			disabled={!progress.includes(task.taskid) && !taskPrerequisitesFulfilled(task, progress)}
			graphItem={true}
		/>
	</div>
{/each}

<style lang="postcss">
	.box {
		@apply shadow-md rounded;
	}
</style>
