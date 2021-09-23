<script>
	import { frontend_url, staticAssetPath } from '$lib/config/config';
	import Body from '$lib/components/avatar/Body.svelte';
	import character from '$lib/stores/character';
import { patch_user_character } from '$lib/api/calls';

	export let assets;
	export let type;
	export let selectedItem;

	async function loadAsset(id) {
		const path = assets.find((x) => x.id == id).path;
		const res = await fetch(`${frontend_url}${staticAssetPath}${path}`);
		if (res.ok) {
			return await res.text();
		} else {
			return new Error(`Could not load`); // TODO: Funktioniert komischerweise aktuell nicht!
		}
	}

	function setAsset(id) {
		switch (type) {
			case 'shirt':
				character.update((x) => {
					x.shirtId = id;
					return x;
				});
				break;
			case 'pants':
				character.update((x) => {
					x.pantsId = id;
					return x;
				});
				break;
			case 'hat':
				character.update((x) => {
					x.hatId = id;
					return x;
				});
				break;
			default:
				break;
		}
	}
</script>

{#each assets.filter((x) => x.type == type) as x}
	<button
		disabled={false && !x.enabled && 'TODO'}
		class="disabled:cursor-not-allowed disabled:bg-gray-200 cursor-pointer hover:transition duration-200 ease-in-out focus:outline-none {x.id ==
		selectedItem
			? 'bg-white   shadow-lg hover:shadow-lg border-2 p-1'
			: 'bg-gray-100 shadow-sm hover:enabled:shadow-md border-2 p-2'} rounded-md m-0.5 h-40 w-30"
		on:click={() => {
			selectedItem = x.id;
			setAsset(x.id);
			patch_user_character($character);
		}}
	>
		{#await loadAsset(x.id)}
			Loading...
		{:then svg}
			<div class="content-center w-full h-full">
				<Body color="#ccc" alpha={0.3}>
					<svg version="1.1" viewBox="0 0 77.707 108.77">
						{@html svg}
					</svg>
				</Body>
			</div>
		{:catch error}
			Fehler beim Laden: {error.message}
		{/await}
	</button>
{/each}
