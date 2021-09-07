<script>
	import { onMount } from 'svelte';

  let divEl;
  let Monaco;
  let editor;

	onMount(async () => {
		Monaco = await import('monaco-editor');
		editor = await Monaco.editor.create(divEl, {
			language: 'c',
			automaticLayout: true
		});
		return () => {
			editor.dispose();
		};
	});
  export function setLanguage() {
    
  }

  export function getValue() {
    if (editor == undefined) {
      return undefined;
    }
    return editor.getModel().getValue();
  }

  export function setValue(value) {
    editor.getModel().setValue(value);
  }


</script>

<div bind:this={divEl} class="h-screen-200" />
