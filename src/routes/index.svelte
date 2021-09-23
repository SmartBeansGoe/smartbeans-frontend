<script>
	import SkillGraph from '$lib/components/dashboard/SkillGraph.svelte';
	import Level from '$lib/components/dashboard/Level.svelte';
	import Achievements from '$lib/components/dashboard/Achievements.svelte';

	import TransitionRootPageWrapper from '$lib/components/ui/transitions/TransitionRootPageWrapper.svelte';
</script>

<TransitionRootPageWrapper>
	<div class="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
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