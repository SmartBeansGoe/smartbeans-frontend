<script>
import { beforeUpdate } from "svelte";


	export let error = undefined;
  console.log("MOIN")
  $: console.log(error);

</script>

{#if error == undefined}
	<slot />
{:else}
  <p>Error: Page Not Found</p>
  <div></div>
{/if}
