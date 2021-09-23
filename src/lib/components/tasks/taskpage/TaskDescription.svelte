<script>
	import marked from 'marked';
	export let task;
</script>

{#if task != undefined}
	<div class="h-full">
		<p class="text-xl font-semibold pb-3">{task.title ? task.title : ''}</p>
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
