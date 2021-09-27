<script>
	import { mdiClipboardCheck, mdiClipboardRemove } from '@mdi/js';
	import Icon from 'mdi-svelte';

	export let submissions;
	console.log(submissions);
	let selected;
	let active;
	submissions.sort((a, b) => b.timestamp - a.timestamp);
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
					{#if submission.score >= 0.99999}
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
			{#if selected.score && selected.result_type}
				<p class="font-bold">{selected.result_type} mit Score: {selected.score}</p>
			{/if}
			{#if selected.simplified}
				{#if selected.simplified.compiler}
					<p>Compiler Ausgabe: (Status Code: {selected.compiler.statusCode})</p>
					<pre>
						<code>
							{selected.simplified.compiler.stdout}
						</code>
				</pre>
				{/if}
				{#if selected.simplified.testCase}
					<pre>
						<code>
							{selected.simplified.testCase.stdin}
						</code>
						<code>
							{selected.simplified.testCase.stdout}
						</code>
						<code>
							{selected.simplified.testCase.expectedStdout}
						</code>
						<code>
							{selected.simplified.testCase.statusCode}
						</code>
					</pre>
				{/if}
			{/if}
			<p>Abgabe:</p>
			<pre>
				<code>{selected.content}</code>
			</pre>
		</div>
	{:else}
		<div class="flex flex-wrap h-full justify-center content-center italic">
			Bisher keine Abgaben vorhanden!
		</div>
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
