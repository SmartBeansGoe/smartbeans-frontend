<script>
	import marked from 'marked';
	export let task;
</script>

<p class="text-xl font-semibold pb-3">{task.name}</p>
<div>{@html marked(task.task)}<!--TODO: DOMPurify--></div>

<style lang="postcss">
	:global(pre) {
		background: white;
		overflow-x: auto;
		padding: 0.5rem 1rem;
	}

	:global(code) {
		@apply text-red-800;
		font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
</style>
