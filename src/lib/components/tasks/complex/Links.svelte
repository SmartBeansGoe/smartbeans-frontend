<script>
	import { onMount } from 'svelte';

	export let links;
	export let progress;

	onMount(() => {
		links.forEach((link) => {
			let nodeSVG = document.getElementById(`s${link.source}t${link.target}-svg`);
			setDimensions(nodeSVG, link);
			let nodePath = document.getElementById(`s${link.source}t${link.target}`);
			drawLink(nodePath, link);
		});
	});

	function setDimensions(node, link) {
		let from = document.getElementById('taskid:' + link.source);
		let to = document.getElementById('taskid:' + link.target);

		let svgTop = from.offsetTop > to.offsetTop ? to.offsetTop : from.offsetTop;
		let svgBottom =
			from.offsetTop + from.offsetHeight > to.offsetTop + to.offsetHeight
				? from.offsetTop + from.offsetHeight
				: to.offsetTop + to.offsetHeight;

		let svgWidth = to.offsetLeft - (from.offsetLeft + from.offsetWidth);
		let svgHeight = svgBottom - svgTop;

		node.style.top = (from.offsetTop > to.offsetTop ? to.offsetTop : from.offsetTop) + 'px';
		node.style.left = from.offsetLeft + from.offsetWidth + 'px';
		node.style.height = svgHeight + 'px';
		node.style.width = svgWidth + 'px';
	}

	function drawLink(node, link) {
		let from = document.getElementById('taskid:' + link.source);
		let to = document.getElementById('taskid:' + link.target);

		let svgWidth = to.offsetLeft - (from.offsetLeft + from.offsetWidth);
		let svgTop = from.offsetTop > to.offsetTop ? to.offsetTop : from.offsetTop;

		let posStart = { x: 0, y: from.offsetTop + from.offsetHeight / 2 - svgTop };
		let posEnd = { x: svgWidth, y: to.offsetTop + to.offsetHeight / 2 - svgTop };

		let color = progress.includes(link.source) ? '#6EE7B7' : '#FCA5A5';
		node.setAttribute('stroke', color);

		if (svgWidth <= 64) {
			node.setAttribute(
				'd',
				`M ${posStart.x},${posStart.y} C ${posStart.x},${posStart.y} ${posStart.x + posEnd.x / 2},${
					posStart.y
				} ${posStart.x + posEnd.x / 2},${(posStart.y + posEnd.y) / 2} ${
					posStart.x + posEnd.x / 2
				},${posEnd.y} ${posEnd.x},${posEnd.y} ${posEnd.x},${posEnd.y}`
			);
		} else {
			node.setAttribute(
				'd',
				`M ${posStart.x},${posStart.y} C ${posStart.x},${posStart.y} ${posStart.x + posEnd.x / 2},${
					posStart.y
				} ${posStart.x + posEnd.x / 2},${(posStart.y + posEnd.y) / 2} ${
					posStart.x + posEnd.x / 2
				},${posEnd.y} ${posEnd.x},${posEnd.y} ${posEnd.x},${posEnd.y}`
			);
		}
	}
</script>

{#each links as link}
	<svg id="s{link.source}t{link.target}-svg" class="absolute">
		<path id="s{link.source}t{link.target}" stroke-width="2px" fill="transparent" />
	</svg>
{/each}
