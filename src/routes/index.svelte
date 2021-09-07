<script>
	import { fade } from 'svelte/transition';
	import fadeScale from 'svelte-transitions-fade-scale';
	import BezierEasing from 'bezier-easing';

	import SkillGraph from '../components/dashboard/SkillGraph.svelte';
	import Level from '../components/dashboard/Level.svelte';
	import Achievements from '../components/dashboard/Achievements.svelte';
</script>

<div
	in:fadeScale={{ delay: 90, duration: 210, baseScale: 0.92, easing: BezierEasing(0, 0, 0.2, 1.0) }}
	out:fade={{ duration: 90, easing: BezierEasing(0.4, 0, 1, 1) }}
	class="p-4 grid grid-cols-1 md:grid-cols-2 content-around gap-4"
>
	<div class="p-4 shadow-md bg-gray-100 rounded"><Level /></div>
	<div class="p-4 shadow-md bg-gray-100 rounded"><Achievements /></div>
	<div class="p-4 shadow-md bg-gray-100 rounded"><SkillGraph /></div>
</div>
