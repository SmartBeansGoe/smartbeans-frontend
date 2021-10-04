<script>
	import Split from 'split.js';

	import { onDestroy, onMount } from 'svelte';

	let splitA;
	let splitB;

	onMount(() => {
		splitA = Split(['#split-0', '#split-1']);
		splitB = Split(['#split-2', '#split-3'], {
			direction: 'vertical'
		});
	});
	onDestroy(() => {
		splitA.destroy();
		splitB.destroy();
	});
</script>

<div class="split h-full">
	<div class="h-full" id="split-0">
		<div class="overflow-y-auto h-5/6 p-4" id="split-2">
			<slot />
		</div>
		<div class="overflow-y-auto h-1/6" id="split-3">
			<slot name="submissions" />
		</div>
	</div>
	<div id="split-1">
		<slot name="editor" />
	</div>
</div>

<style>
	.split {
		display: flex;
		flex-direction: row;
	}
</style>
