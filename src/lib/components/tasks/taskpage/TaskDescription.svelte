<script>
	import Icon from 'mdi-svelte';
	import marked from 'marked';
	import { mdiCheckBold } from '@mdi/js';

	export let task;
	export let solved;
</script>

{#if task != undefined}
	<div class="h-full">
		<div class="flex justify-between">
			<span class="text-xl font-semibold pb-3">{@html marked(task.title ? task.title : '')}</span>
			<span class="text-emerald-600">
				{#if solved}
					<Icon size={"32px"} path={mdiCheckBold} />
				{/if}
			</span>
		</div>
		<div>{@html marked(task.task ? task.task : '')}<!--TODO: DOMPurify--></div>
	</div>
{/if}

<style lang="postcss">
	:global(pre) {
		background: white;
		overflow-x: auto;
		padding: 0.5rem 1rem;
	}

	:global(code) {
		@apply text-red-800 text-sm;
		font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
</style>
