<script>
	import { page } from '$app/stores';

	export let cls;
	export let link;

	$: active = link == $page.path;
</script>

<a
	class="flex items-center space-x-2 py-2.5 px-3 my-1.5 rounded-md transition duration-200 active:bg-gray-100 hover:text-black hover:bg-gray-400 {active ? "text-black bg-gray-200" : ""}"
	href={link}
>
	<slot name="prepend" />
	<span class="{cls} invisible lg:visible duration-200 fade-out"><slot /></span>
</a>
