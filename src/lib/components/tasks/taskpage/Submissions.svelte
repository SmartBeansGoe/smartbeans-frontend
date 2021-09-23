<script>
	import { mdiClipboardCheck, mdiClipboardRemove } from '@mdi/js';
	import Icon from 'mdi-svelte';

	export let submissions;
	console.log(submissions);
	let selected;
	let active;
	submissions.reverse();
	if (submissions.length > 0) {
		active = 0;
		selected = submissions[active];
	}
	function handleTabChange(id) {
		active = id;
		selected = submissions[active];
	}
</script>

<div class="h-full p-1">
	<div class="bg-white tabs">
		{#each submissions as submission, i}
			<button
				on:click={() => handleTabChange(i)}
				class="text-gray-600 py-1 px-2 block hover:text-blue-500 focus:outline-none border-b-2 {active ==
				i
					? 'text-blue-500 border-blue-500'
					: 'border-white'}"
			>
				<div class="flex items-center">
					<div class="pr-1">{submissions.length - i}</div>
					{#if submission.score >= 0.99}
						<div class="flex text-green-500">
							<Icon size="18px" path={mdiClipboardCheck} />
						</div>
					{:else}
						<div class="flex text-red-500">
							<Icon size="18px" path={mdiClipboardRemove} />
						</div>
					{/if}
				</div>
			</button>
		{/each}
	</div>
	{#if selected != undefined}
		<div class="p-3">
			<p>Ergebnis: {selected.score}</p>
			<p>Abgabe:</p>
			<pre>
      <code>{selected.code}</code>
    </pre>
		</div>
	{:else}
		<div class="flex flex-wrap h-full justify-center content-center italic">Bisher keine Abgaben vorhanden!</div>
	{/if}
</div>

<style lang="postcss">
	.tabs {
		@apply flex flex-row overflow-x-auto;
	}

	pre {
		background: white;
		overflow-x: auto;
		padding: 0.1rem 0.5rem;
		tab-size: 4;
	}

	code {
		@apply text-red-800 text-sm;
		font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
	}
</style>
