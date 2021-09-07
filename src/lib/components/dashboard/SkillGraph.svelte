<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
  
	let ctx;
	let chart;
	let chartCanvas;

	onMount(() => {
		ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'radar',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'My First dataset',
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: 'rgb(255, 99, 132)',
						data: [0, 10, 5, 2, 20, 30, 45]
					}
				]
			},
			options: {
				maintainAspectRatio: false
			}
		});
	});
</script>


<div class="text-2xl font-bold">Fähigkeiten</div>
<div class="max-h-72"><canvas bind:this={chartCanvas} /></div>
