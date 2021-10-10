<script>
	import { pad_url } from '$lib/config/config';

	import { tasks, user } from '$lib/stores/stores';

	import { mdiClipboardCheck, mdiClipboardRemove, mdiShare } from '@mdi/js';
	import Icon from 'mdi-svelte';

	export let submissions;

	let selected;
	let active;
	$: submissions.sort((a, b) => b.timestamp - a.timestamp);
	$: if (submissions.length > 0) {
		active = 0;
	}
	function handleTabChange(id) {
		active = id;
	}
	$: selected = submissions[active];

	function share() {
		let task = $tasks.find((t) => t.taskid == selected.taskid);
		let date = new Date(selected.timestamp * 1000);
		let time = date.toLocaleString();
		let body =
			`# Aufgabe "${task.task_description.shortname}"" Id: ${selected.taskid}\n` +
			`Abgabe von *${$user.username}* aus dem Kurs *${$user.activeCourse}*\n` +
			`Datum: ${time}\n` +
			`## Problembeschreibung:\n *Beschreibe dein Problem und teile den Link mit einem Tutor.*\n` +
			`**WICHTIG**: *Speichere auch du dir den Link ab.*\n` +
			`## Testergebnis\n` +
			`Result: ${selected.result_type}\n\n` +
			(selected.simplified.testCase.stdin != undefined
				? `### Standardeingabe:\n\`\`\`\n${selected.simplified.testCase.stdin}\n\`\`\`\n`
				: '') +
			(selected.simplified.testCase.stdout != undefined
				? `### Standardausgabe:\n\`\`\`\n${selected.simplified.testCase.stdout}\n\`\`\`\n`
				: '') +
			(selected.simplified.testCase.expectedStdout != undefined
				? `### Geforderte Standardausgabe:\n\`\`\`\n${selected.simplified.testCase.expectedStdout}\`\`\`\n`
				: '') +
			`### Abgabe:\n\`\`\`${task.lang}\n${selected.content}\n\`\`\``;
		fetch(`${pad_url}/new`, {
			headers: { 'Content-Type': 'text/markdown' },
			method: 'POST',
			body: body
		})
			.then((response) => {
				window.open(response.url + '?both');
			})
			.catch((error) => {
				console.log(error);
			});
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
			<div class="flex justify-between">
				<div>
					{#if selected.score != undefined && selected.result_type != undefined}
						<p class="font-bold">{selected.result_type} mit Score: {selected.score}</p>
					{/if}
				</div>
				<button
					class="btn-outlined blue-outlined-btn"
					title="Teile diese Abgabe mit einem Tutor."
					on:click={share}
				>
					<div class="-my-1 -mx-2.5">
						<Icon size="1.5rem" path={mdiShare} />
					</div>
				</button>
			</div>
			{#if selected.simplified != undefined}
				{#if selected.simplified.compiler != undefined}
					<p>Compiler Ausgabe: (Status Code: {selected.compiler.statusCode})</p>
					<pre>
						<code>{selected.simplified.compiler.stdout}</code>
				</pre>
				{/if}
				{#if selected.simplified.testCase != undefined}
					{#if selected.simplified.testCase.stdin != undefined}
						<p>Standardeingabe</p>
						<pre>
						<code>{selected.simplified.testCase.stdin}</code>
					</pre>
					{/if}
					{#if selected.simplified.testCase.stdout != undefined}
						<p>Standardausgabe</p>
						<pre>
						<code>{selected.simplified.testCase.stdout}</code>
					</pre>
					{/if}
					{#if selected.simplified.testCase.expectedStdout != undefined}
						<p>Geforderte Standardausgabe</p>
						<pre>
						<code>{selected.simplified.testCase.expectedStdout}</code>
					</pre>
					{/if}
					{#if selected.simplified.testCase.exitCode != undefined}
						<p>Exit Code:</p>
						<pre>
						<code>{selected.simplified.testCase.exitCode}</code>
					</pre>
					{/if}
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

	.btn-outlined {
		@apply bg-transparent border border-solid 'disabled:hover:bg-gray-100' 'disabled:cursor-not-allowed' 'hover:text-white' 'active:bg-light-blue-600' font-bold uppercase text-xs px-4 py-2 rounded outline-none 'focus:outline-none' mr-1 mb-1 ease-linear transition-all duration-150;
	}
	.blue-outlined-btn {
		@apply 'hover:bg-light-blue-500';
		@apply text-light-blue-500;
		@apply 'disabled:text-light-blue-200';
		@apply border-light-blue-500;
	}
</style>
