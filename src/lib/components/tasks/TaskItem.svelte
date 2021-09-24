<script>
	import { goto } from '$app/navigation';
	import Icon from 'mdi-svelte';
	import {
		mdiCheckboxBlankCircle,
		mdiCheckCircle,
		mdiCodeTags,
		mdiLanguageC,
		mdiLanguageJava,
		mdiLanguagePython,
		mdiLanguageRust
	} from '@mdi/js';

	export let task;
	let taskDescription = task.task_description;

	let icon;
	switch (task.lang) {
		case 'c':
			icon = mdiLanguageC;
			break;
		case 'py':
			icon = mdiLanguagePython;
			break;
		case 'python':
			icon = mdiLanguagePython;
			break;
		case 'java':
			icon = mdiLanguageJava;
			break;
		case 'rust':
			icon = mdiLanguageRust;
			break;
		default:
			icon = mdiCodeTags;
			break;
	}
</script>

<div
	on:click={() => {
		goto(`/tasks/${task.taskid}`);
	}}
	class="flex justify-between cursor-pointer hover:ring-2 hover:ring-indigo-300 p-2 rounded"
>
	<div class="flex w-full justify-between">
		<div class="flex flex-wrap content-center">
			{taskDescription.title}
			<span class="pl-2 text-red-400"><Icon path={icon} /></span>
		</div>
		<div>
			{#each task.tags as tag}
				<div
					class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 uppercase last:mr-0 mr-1 hover:bg-indigo-300 hover: text-indigo-600 hover:cursor-pointer"
					on:click={(event) => {
						event.stopPropagation();
						goto(`/tasks?category=${tag}`);
					}}
				>
					{tag}
				</div>
			{/each}
		</div>
	</div>
	<div class="pl-2">
		{#if task.solved}
			<div class="text-emerald-600">
				<Icon path={mdiCheckCircle} />
			</div>
		{:else}
			<div class="text-gray-300">
				<Icon path={mdiCheckboxBlankCircle} />
			</div>
		{/if}
	</div>
</div>
