<script>
	import { onMount } from 'svelte';

	export let language;
	export let editor;
	export let editorValue;
	export let taskid;

	let divEl;
	let Monaco;
	let oldTaskId;

	$: if (editor && taskid != oldTaskId) {
		oldTaskId = taskid;
		editor.getModel().setValue(editorValue);
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
		editor.getModel().setValue(editorValue);
	});
</script>

<div bind:this={divEl} class="h-full" />
