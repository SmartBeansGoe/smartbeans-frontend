<script>
	export let placeholder;
	export let value;
  export let mdiIcon;
</script>

<div class="relative flex w-full flex-wrap items-stretch mb-2">
	<input
		bind:value
		type={type}
		{placeholder}
		class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-md border border-blue-300 outline-none focus:outline-none focus:ring-1 w-full pr-1"
	/>
	<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 pt-3">
		<Icon path={mdiIcon} />
	</span>
</div>
