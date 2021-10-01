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
	export let solved;
	export let graphItem = false;
	export let disabled = false;

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
	class="flex justify-between cursor-pointer hover:ring-2 p-2 rounded {solved && graphItem
		? ' ring-2 ring-emerald-500 '
		: ''} {disabled
		? ' hover:ring-red-300 bg-gray-200 '
		: graphItem
		? ' bg-white hover:ring-emerald-300 '
		: ' hover:ring-indigo-400 '}"
>
	<div
		class="flex flex-wrap content-center w-full justify-between {disabled ? 'text-gray-400' : ''}"
	>
		{taskDescription.shortname}
		<div>
			{#each task.tags as tag}
				<div
					class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded {disabled
						? 'text-indigo-400 bg-indigo-100 hover:bg-indigo-50'
						: 'text-indigo-600 bg-indigo-200 hover:bg-indigo-300 hover:text-indigo-600'} uppercase last:mr-0 mr-1 hover:cursor-pointer"
					on:click={(event) => {
						event.stopPropagation();
						goto(`/tasks?category=${tag.name}`);
					}}
				>
					{tag.name}
				</div>
			{/each}
		</div>
	</div>
	<div class="pl-2">
		{#if solved}
			<div class="text-emerald-600">
				<Icon path={mdiCheckCircle} />
			</div>
		{:else}
			<div class="text-gray-300">
				<Icon path={mdiCheckboxBlankCircle} />
			</div>
		{/if}
		<div class={disabled ? 'text-red-200' : 'text-red-400'}><Icon path={icon} /></div>
	</div>
</div>
