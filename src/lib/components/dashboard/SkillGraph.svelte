<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto/auto.js';
	import { tasks, progress } from '$lib/stores/stores';

	let ctx;
	let chart;
	let chartCanvas;
	let skills;

	onMount(async () => {
		skills = getSkillsFrom($tasks);
		ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'radar',
			data: {
				labels: Object.keys(skills),
				datasets: [
					{
						backgroundColor: '#10b98150',
						borderColor: '#10b981',
						data: calcRatio($tasks, $progress, skills)
					}
				]
			},
			options: {
				scale: {
					beginAtZero: true,
					max: 100,
					min: 0
				},
				plugins: {
					legend: {
						display: false
					},
					maintainAspectRatio: false
				}
			}
		});
	});

	function getSkillsFrom(tasks) {
		return tasks
			.map((task) => task.tags.filter((t) => t.hasOwnProperty('points')))
			.flat()
			.reduce((acc, obj) => {
				let key = obj['name'];
				if (!acc[key]) {
					acc[key] = 0;
				}
				acc[key] += parseInt(obj.points);
				return acc;
			}, {});
	}

	function calcPoints(tasks, progress) {
		let points = {};
		progress.forEach((solved) => {
			let task = tasks.find((t) => t.taskid == solved);
			let taskSkills = task.tags.filter((t) => t.hasOwnProperty('points'));
			taskSkills.forEach((t) => {
				if (!points[`${t.name}`]) {
					points[`${t.name}`] = 0;
				}
				points[`${t.name}`] += parseInt(t.points);
			});
		});
		return points;
	}

	function calcRatio(tasks, progress, skills) {
		let points = calcPoints(tasks, progress);
		let ratio = Object.keys(skills).map((skill) => {
			if (!points[skill]) {
				return 0;
			}
			return (points[skill] / skills[skill]) * 100;
		});
		return ratio;
	}
	$: if (chart && $progress && $tasks && skills) {
		chart.data.datasets.forEach((dataset) => (dataset.data = calcRatio($tasks, $progress, skills)));
	}
</script>

<div class="m-4 h-full min-h-64">
	<div class="text-2xl font-bold h-1/10">Fähigkeiten</div>
	<canvas class="max-h-8/10" bind:this={chartCanvas} />
</div>
