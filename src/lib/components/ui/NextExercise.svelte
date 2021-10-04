<script>
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import { mdiChevronRight } from '@mdi/js';
	import Icon from 'mdi-svelte';

	export let taskid;
	export let taskShortName;

	function handleClick() {
		toast.pop();
		goto(`/tasks/${taskid}`);
	}
</script>

<button on:click={handleClick}>
	<div class="flex">
    <span class="flex flex-wrap content-center"><Icon size={1.5} path={mdiChevronRight} /></span>
		<p class="flex flex-wrap content-center">Nächste Aufgabe: {taskShortName}</p>
	</div>
</button>
