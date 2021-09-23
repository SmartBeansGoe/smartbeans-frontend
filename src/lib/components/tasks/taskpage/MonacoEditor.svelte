<script>
	import { onMount } from 'svelte';

	export let language;
	export let defaultEditorInput;
	export let editorValue;

	let divEl;
	let Monaco;
	let editor;

	onMount(async () => {
		Monaco = await import('monaco-editor');
		editor = await Monaco.editor.create(divEl, {
			language: language,
			automaticLayout: true
		});
    editor.getModel().onDidChangeContent((event) => {
			editorValue = editor.getModel().getValue();
		});
		editor.setValue(defaultEditorInput);

	});

	export function setValue(value) {
		editor.getModel().setValue(value);
	}
</script>

<div bind:this={divEl} class="h-full" />
