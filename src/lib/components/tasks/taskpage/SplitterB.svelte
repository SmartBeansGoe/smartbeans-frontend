<script>
	import Split from 'split.js';

	import { onDestroy, onMount } from 'svelte';

	let splitA;
	let splitB;

	onMount(() => {
		splitA = Split(['#split-4', '#split-5']);
	});
	onDestroy(() => {
		splitA.destroy();
	});
</script>

<div class="split h-full">
	<div class="h-full p-4" id="split-4">
		<slot />
	</div>
	<div id="split-5" class="h-full">
		<div class="h-1/12">
			<div class="p-4">
				<slot name="file-upload" />
			</div>
			<div class="gutter" style="height: 10px;" />
		</div>
		<div class="overflow-y-auto h-11/12">
			<slot name="submissions" />
		</div>
	</div>
</div>

<style>
	.split {
		display: flex;
		flex-direction: row;
	}
</style>
