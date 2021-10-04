<!--
	Based on CREATIVE TIM's Notus TailwindCSS alerts
	Source: https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus
	License: MIT
  Access Date: 2021/10/04
-->

<script>
  export let message;
  let alertOpen = true;
  function closeAlert(){
    alertOpen = false;
  }
</script>

{#if alertOpen}
  <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-opacity-90 bg-red-500">
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell"></i>
    </span>
    <span class="inline-block align-middle mr-8">
      <b class="capitalize">Warning!</b> {message}
    </span>
    <button class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none" on:click={closeAlert}>
      <span>×</span>
    </button>
  </div>
{/if}