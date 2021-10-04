<script>
	import { onMount } from 'svelte';

	export let language;
	export let defaultEditorInput;
	export let editorValue;

	let divEl;
	let Monaco;
	let editor;
	let editorOldInput;

	$: if (editor && editorOldInput != defaultEditorInput) setValue(defaultEditorInput);

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
		editorOldInput = defaultEditorInput;
	});

	export function setValue(value) {
		editor.getModel().setValue(value);
	}
</script>

<div bind:this={divEl} class="h-full" />
