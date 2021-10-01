<script>
	import { frontend_url, staticAssetPath } from '$lib/config/config';

	export let id;

	async function loadAsset(id) {
		const res = await fetch(`${frontend_url}${staticAssetPath}/${id}.svg`, {
			'Cache-Control': 'public'
		});
		if (res.ok) {
			return await res.text();
		} else {
			return new Error(`Could not load`); // TODO: Funktioniert komischerweise aktuell nicht!
		}
	}
</script>

{#if id != undefined}
	{#await loadAsset(id)}
		{'test'}
	{:then svg}
		<svg version="1.1" viewBox="0 0 77.707 108.77">
			{@html svg}
		</svg>
	{/await}
{/if}
