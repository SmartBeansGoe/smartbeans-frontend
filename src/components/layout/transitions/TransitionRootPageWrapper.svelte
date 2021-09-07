<script>
	import { fade } from 'svelte/transition';
	import BezierEasing from 'bezier-easing';
	import fadeScale from 'svelte-transitions-fade-scale';

	let fromSubRoute = false; // TODO
</script>

{#if !fromSubRoute}
	<div
		in:fadeScale={{
			delay: 90,
			duration: 210,
			baseScale: 0.92,
			easing: BezierEasing(0, 0, 0.2, 1.0)
		}}
		out:fade={{ duration: 90, easing: BezierEasing(0.4, 0, 1, 1) }}
		class="overflow-y h-screen"
	>
		<slot />
	</div>
{:else}
	<div out:fade={{ duration: 90, easing: BezierEasing(0.4, 0, 1, 1) }} class="overflow-y h-screen">
		<slot />
	</div>
{/if}

