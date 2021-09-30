<script>
	import TaskItem from '../TaskItem.svelte';

	export let tasks;
	export let links;
	export let key;

	function hightlightLinksTo(target) {
		hoveredTask = target;
		const linkToHighlight = links.filter((link) => link.target == target);
		linkToHighlight.forEach((link) => {
			let linkPath = document.getElementById(`s${link.source}t${link.target}`);
			linkPath.setAttribute('stroke-width', '5px');
			linkPath.setAttribute('stroke', 'green');

			let linkSVG = document.getElementById(`s${link.source}t${link.target}-svg`);
			linkSVG.style['z-index'] = 2;
		});
	}
	function deHightlightLinksTo(target) {
		hoveredTask = target;
		const linkToDeHighlight = links.filter((link) => link.target == target);
		linkToDeHighlight.forEach((link) => {
			let linkPath = document.getElementById(`s${link.source}t${link.target}`);
			linkPath.setAttribute('stroke-width', '2px');
			linkPath.setAttribute('stroke', '#ccc');

			let linkSVG = document.getElementById(`s${link.source}t${link.target}-svg`);
			linkSVG.style['z-index'] = 0;
		});
	}

	let hoveredTask = null;
</script>

{#each tasks as task, i (task.taskid)}
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div
		id="taskid:{task.taskid}"
		class="absolute m-1 box w-96 max-w-96 max-h-24 z-index-1"
		style="top: {7 * i}rem;left: {28 * key}rem;"
		on:mouseover={() => hightlightLinksTo(task.taskid)}
		on:mouseout={() => deHightlightLinksTo(task.taskid)}
	>
		<TaskItem {task} />
	</div>
{/each}

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded;
	}
</style>
