<script>
	import WardrobeShelf from './WardrobeShelf.svelte';
	import character from '$lib/stores/character';

	export let assets;
	export let title;

	let types = Array.from(new Set(assets.map((x) => x.type)));
	let selected = types[0];

	function getSelectedAsset() {
		switch (selected) {
			case 'shirt':
				return $character.shirtId;
			case 'pants':
				return $character.pantsId;
			case 'hat':
				return $character.hatId;
			default:
				return null;
		}
	}

	$: console.log($character);
</script>

<div class="p-1 border-t-2 border-x-2 rounded-t-md">
	<div class="flex justify-between">
		<div>
			<span class="p-5 font-bold text-xl">{title}</span>
			{#each types as type}
				<button
					class="pt-1 pb-0.5 mx-1 px-2 focus:outline-none border-b-2 hover:border-b-2 hover:border-blue-300 {selected ==
					type
						? 'border-blue-500'
						: 'border-gray-100'}"
					on:click={() => (selected = type)}>{type}</button
				>
			{/each}
		</div>
		<!-- <button
			class="transition ring-2 p-1 ring-green-700 px-1 active:bg-green-400 hover:bg-green-600 rounded-sm bg-green-500 focus:outline-none text-white"
			on:click={() => patch_user_character($character)}>Speichern</button
		> -->
	</div>
</div>
<div class="flex flex-wrap p-1 border-2 rounded-b-md h-126 max-h-full overflow-y-auto">
	<WardrobeShelf
		{assets}
		type={selected}
		selectedItem={() => getSelectedAsset()}
		on:change={() => console.log('change')}
	/>
</div>
