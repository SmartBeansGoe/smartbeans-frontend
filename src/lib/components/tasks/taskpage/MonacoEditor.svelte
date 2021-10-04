<script>
	import { onMount } from 'svelte';

	export let language;
	export let defaultEditorInput;
	export let editorValue;
	export let taskid;

	let divEl;
	let Monaco;
	let editor;
	let oldTaskId;

	$: if (editor && taskid != oldTaskId) {
		oldTaskId = taskid;
		setValue(defaultEditorInput);
	}
	onMount(async () => {
		Monaco = await import('monaco-editor');
		editor = Monaco.editor.create(divEl, {
			language: language,
			automaticLayout: true
		});
		editor.getModel().onDidChangeContent(() => {
			editorValue = editor.getModel().getValue();
		});
		editor.setValue(defaultEditorInput);
	});

	export function setValue(value) {
		editor.getModel().setValue(value);
	}
</script>

<div bind:this={divEl} class="h-full" />
