<script>
	import { onMount } from 'svelte';
	import MonacoEditor from './MonacoEditor.svelte';
	import Icon from 'mdi-svelte';
	import { mdiFileDownload, mdiFileUpload, mdiReloadAlert, mdiUpload } from '@mdi/js';
	import { submit_code } from '$lib/api/calls';
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/env';
	import { writable } from 'svelte/store';

	export let task;
	export let courseId;

	let editorComponent;
	let fileInputComponent;

	let uploadDocument;
	let downloadDocument;

	let isSubmitLoading = false;
	let submitDocumentDisabled = true;
	let downloadDocumentDisabled = true;

	let editor;
	let editorValueStore;
	let defaultEditorInput;

	$: if (browser && task) {
		// Load code from localStorage when exists
		defaultEditorInput = task.task_description.defaultEditorInput;
		let localStorageName = `store-task-${task.taskid}`;
		let stored = localStorage.getItem(localStorageName);
		editorValueStore = writable(
			stored == null || stored == undefined || stored == ''
				? defaultEditorInput
				: localStorage.getItem(localStorageName)
		);
		editorValueStore.subscribe((val) => localStorage.setItem(localStorageName, val));
	}

	onMount(async () => {
		// Uploads a document from user's computer into the editor.
		uploadDocument = (e) => {
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.readAsText(file);
			reader.onload = () => {
				let uploadedCode = reader.result;
				editorComponent.setValue(uploadedCode);
			};
		};
		// Downloads the content of the editor into a document to user's computer.
		downloadDocument = () => {
			const element = document.createElement('a');
			const file = new Blob([$editorValueStore], {
				type: 'text/plain'
			});
			element.href = URL.createObjectURL(file);
			let filename_ext;
			switch (task.lang) {
				case 'c':
					filename_ext = '.c';
					break;
				case 'py':
					filename_ext = '.py';
					break;
				case 'python':
					filename_ext = '.py';
					break;
				case 'java':
					filename_ext = '.java';
					break;
				case 'javascript':
					filename_ext = '.js';
					break;
				case 'rust':
					filename_ext = '.rs';
			}
			element.download = task.task_description.shortname.replaceAll(' ', '-') + filename_ext;
			document.body.appendChild(element);
			element.click();
		};
	});

	$: {
		submitDocumentDisabled = $editorValueStore == '';
		downloadDocumentDisabled = $editorValueStore == '';
	}

	const dispatch = createEventDispatcher();

	async function onSubmit() {
		isSubmitLoading = true;

		await submit_code(courseId, task.taskid, $editorValueStore)
			.then((res) => {
				dispatch('submit', { isError: false, ...res.data });
				return res.data;
			})
			.catch((err) => {
				dispatch('submit', { isError: true, error: err });
				return err;
			});
		isSubmitLoading = false;
	}

	function reset() {
		$editorValueStore = defaultEditorInput;
		editor.getModel().setValue(defaultEditorInput);
	}
</script>

<div class="editor-height">
	<MonacoEditor
		bind:this={editorComponent}
		language={task.lang}
		{defaultEditorInput}
		taskid={task.taskid}
		bind:editorValue={$editorValueStore}
		bind:editor
	/>
</div>
<div class="mt-2 flex justify-between overflow-x-auto">
	<div class="flex">
		<span>
			<button
				class="flex items-center btn-outlined blue-outlined-btn"
				type="button"
				on:click|preventDefault={() => {
					fileInputComponent.click();
				}}
			>
				<div class="mr-2 -my-2 -ml-2">
					<Icon size="1.5rem" path={mdiFileUpload} />
				</div>
				<div>Upload</div>
			</button>
		</span>
		<span>
			<button
				class="flex items-center btn-outlined blue-outlined-btn"
				type="button"
				disabled={downloadDocumentDisabled}
				on:click|preventDefault={downloadDocument}
			>
				<div class="mr-2 -my-2 -ml-2">
					<Icon size="1.5rem" path={mdiFileDownload} />
				</div>
				<div>Download</div>
			</button>
		</span>
		<span>
			<button
				class="flex items-center btn-outlined red-outlined-btn"
				type="button"
				title="Setzt den Editorinhalt auf den Ursprungscode zurück."
				on:click|preventDefault={reset}
			>
				<div class="mr-2 -my-2 -ml-2">
					<Icon size="1.5rem" path={mdiReloadAlert} />
				</div>
				<div>Reset</div>
			</button>
		</span>
	</div>
	<div>
		<button
			class="flex items-center btn-submit"
			type="button"
			disabled={submitDocumentDisabled}
			on:click|preventDefault={onSubmit}
		>
			{#if isSubmitLoading}
				<div
					style="border-top-color:transparent"
					class="mr-2 ml-2px w-4 h-4 border-3 border-emerald-600 border-solid rounded-full animate-spin"
				/>
			{:else}
				<div class="mr-2 -my-2 -ml-1">
					<Icon size="1.4rem" path={mdiUpload} />
				</div>
			{/if}
			<div>Abgabe</div>
		</button>
	</div>
	<input
		style="display:none"
		type="file"
		on:change={(e) => uploadDocument(e)}
		bind:this={fileInputComponent}
	/>
</div>

<style lang="postcss">
	.btn-submit {
		@apply bg-emerald-500 text-white 'active:bg-emerald-600' 'disabled:cursor-not-allowed' 'disabled:bg-emerald-200' font-bold uppercase text-xs px-4 py-2 rounded ':not(:disabled):shadow' ':not(:disabled):hover:shadow-md' outline-none 'focus:outline-none' mr-1 mb-1 ease-linear transition-all duration-150;
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
	.red-outlined-btn {
		@apply 'hover:bg-red-500';
		@apply text-red-500;
		@apply 'disabled:text-red-200';
		@apply border-red-500;
	}

	.editor-height {
		height: calc(100% - 48px);
	}
</style>
