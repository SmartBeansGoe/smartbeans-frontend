<script>
	import Asset from './Asset.svelte';

	import Body from './Body.svelte';
	import Face from './Face.svelte';

	export let character;
	let bodyColor = character.bodyColor ? character.bodyColor : '#558844';
</script>

<Body color={bodyColor}>
	<Face slot="face" />
	<Asset slot="pants" id={character.pantsId} />
	<Asset slot="shirt" id={character.shirtId} />
	<Asset slot="hat" id={character.hatId} />
</Body>
