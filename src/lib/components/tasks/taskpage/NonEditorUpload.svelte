<script>
	import Icon from 'mdi-svelte';
	import { mdiFileUpload, mdiUpload } from '@mdi/js';
	import { submit_code } from '$lib/api/calls';
	import { createEventDispatcher } from 'svelte';

	export let task;
	export let courseId;
	let fileInputComponent;

	let fileName;
	let uploadedCode;
	let isSubmitLoading = false;

	function uploadFile(event) {
		let file = event.target.files[0];
		console.log(file.name);
		fileName = file.name;
		let reader = new FileReader();
		reader.readAsText(file);
		reader.onload = () => {
			uploadedCode = reader.result;
		};
	}

	const dispatch = createEventDispatcher();

	async function onSubmit() {
		isSubmitLoading = true;

		await submit_code(courseId, task.taskid, uploadedCode)
			.then((res) => {
				dispatch('submit', { isError: false, ...res.data });
				return res.data;
			})
			.catch((err) => {
				dispatch('submit', { isError: true, error: err });
				return err;
			});
		isSubmitLoading = false;
		fileName = undefined;
		uploadedCode = undefined;
	}
</script>

<div class="flex justify-between overflow-x-auto">
	<div
		class="flex flex-nowrap justify-center rounded-md text-sm"
		role="group"
		on:click={() => fileInputComponent.click()}
	>
		<button
			class="flex items-center bg-light-blue-500 text-white hover:bg-light-blue-600 border border-r-0 border-light-blue-500 rounded-l-md px-4 py-1.5 mx-0 outline-none focus:shadow-outline"
		>
			<div class="mr-2 -my-2 -ml-2">
				<Icon size="1.5rem" path={mdiFileUpload} />
			</div>
			<div>Datei auswählen</div></button
		>
		<button
			class="bg-white text-light-blue-500 border border-l-0 focus:outline-none border-light-blue-500 rounded-r-md px-4 py-1.5 mx-0 outline-none focus:shadow-outline"
			>{fileName ? fileName : 'Keine Datei ausgewählt'}</button
		>
	</div>
	<button
		class="flex items-center btn-submit"
		type="button"
		disabled={fileName === undefined}
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
	<input
		style="display:none"
		type="file"
		on:change={(e) => uploadFile(e)}
		bind:this={fileInputComponent}
	/>
</div>

<style lang="postcss">
	.btn-submit {
		@apply bg-emerald-500 text-white 'active:bg-emerald-600' 'disabled:cursor-not-allowed' 'disabled:bg-emerald-200' text-sm px-4 'py-1.5' rounded-md ':not(:disabled):shadow' ':not(:disabled):hover:shadow-md' outline-none 'focus:outline-none' ease-linear transition-all duration-150;
	}
</style>
