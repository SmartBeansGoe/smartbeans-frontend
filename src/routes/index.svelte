<script>
	import { fade } from 'svelte/transition';
	import fadeScale from 'svelte-transitions-fade-scale';
	import BezierEasing from 'bezier-easing';

	import SkillGraph from '../components/dashboard/SkillGraph.svelte';
	import Level from '../components/dashboard/Level.svelte';
	import Achievements from '../components/dashboard/Achievements.svelte';

	import TransitionRootPageWrapper from '../components/layout/transitions/TransitionRootPageWrapper.svelte';
</script>

<TransitionRootPageWrapper>
	<div class="p-4 grid grid-cols-1 md:grid-cols-2 content-around gap-4">
		<div class="box"><Level /></div>
		<div class="box"><Achievements /></div>
		<div class="box"><SkillGraph /></div>
	</div>
</TransitionRootPageWrapper>

<style lang="postcss">
	.box {
		@apply p-4 shadow-md bg-gray-100 rounded;
	}
</style>