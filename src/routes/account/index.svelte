<script context="module">
	export async function load({ fetch }) {
		return await fetch(`${frontend_url}${staticAssetPath}/assets.json`)
			.then((response) => response.json())
			.then((data) => {
				return { status: 200, props: { assets: data } };
			})
			.catch((err) => {
				return { status: 404, props: { assets: [] } };
			});
	}
</script>

<script>
	import { axiosInstance } from '$lib/auth/auth';
	import Wardrobe from '$lib/components/account/Wardrobe.svelte';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import { frontend_url, staticAssetPath } from '$lib/config/config';
	import { character, user } from '$lib/stores/stores';
	import { mdiContentSave, mdiPencil } from '@mdi/js';
	import Icon from 'mdi-svelte';

	export let assets;

	$: displayName = $user.displayName;
	$: passwordSet = $user.passwordSet;
	
	let editDisplayName = true;

	function putDisplayName(displayName) {
		axiosInstance()
			.put('/user/displayName', { displayName: displayName })
			.catch((err) => {
				// TODO: error notification message!
			});
	}

	function updateDisplayName(name) {
		user.update((x) => {
			x.displayName = name;
			return x;
		});
	}
</script>

<TransitionWrapper>
	<div class="h-full p-4">
		<div class="h-full overflow-y-auto">
			<div class="grid grid-rows-3 grid-cols-1 gap-4">
				<div class="h-full row-start-1 row-span-3 p-4 box">
					<Wardrobe {assets} title="Garderobe" {character} />
				</div>
				<div class="row-start-4 h-full p-4 box">
					<p class="font-bold text-xl">Profileinstellungen</p>
					<div class="flex content-center w-full">
						<p class="py-1 w-40">Avatarname:</p>
						<div class="flex w-2/6">
							<input
								class="w-full rounded-l-md ring-1 disabled:cursor-not-allowed focus:outline-none focus:ring-blue-500 px-2 py-1 disabled:bg-gray-200 disabled:text-gray-500"
								disabled={editDisplayName}
								bind:value={displayName}
							/>
							{#if editDisplayName}
								<button
									class="rounded-r-md ring-1 text-blue-500 shadow-sm border bg-white p-1 justify-center"
									on:click={() => (editDisplayName = !editDisplayName)}
									><Icon path={mdiPencil} /></button
								>
							{:else}
								<button
									class="rounded-r-md ring-1 text-blue-500 shadow-sm border bg-white p-1 justify-center"
									on:click={() => {
										editDisplayName = !editDisplayName;
										if (displayName != $user.displayName) {
											updateDisplayName(displayName);
											putDisplayName(displayName);
										}
									}}><Icon path={mdiContentSave} /></button
								>
							{/if}
						</div>
					</div>
					<div class="flex content-center w-full">
						<p class="py-1 w-40">Passwort:</p>
						{#if passwordSet}
							<button
								class="w-2/6 rounded-md ring-1 text-blue-500 shadow-sm border bg-white p-1 justify-center"
								>Neues Passwort</button
							>
							<!-- TODO -->
						{:else}
							<button
								class="w-2/6 rounded-md ring-1 text-blue-500 shadow-sm border bg-white p-1 justify-center"
								>Passwort hinzufuegen</button
							>
							<!-- TODO -->
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
</TransitionWrapper>

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded;
	}
</style>
