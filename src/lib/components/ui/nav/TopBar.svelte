<script>
	import { mdiChevronDown } from '@mdi/js';

	import Icon from 'mdi-svelte';

	export let title;
	export let username;
	let dropdown = false;
</script>

<svelte:window on:click={() => (dropdown = false)} />
<div class="px-4 sticky top-0 bg-gray-200 z-50 max-h-64px">
	<div class="h-full border-b-4 border-dotted border-gray-300">
		<div class="px-6 py-4 flex justify-between items-center">
			<p class="text-xl font-semibold flex">{title}</p>
			{#if username != undefined}
				<div class="relative inline-block text-left">
					<div>
						<button
							type="button"
							id="menu-button"
							class="inline-flex justify-center content-center rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-gray-100 font-medium text-gray-700 hover:ring-1 focus:ring-1 hover:not(:focus):ring-indigo-200 focus:ring-indigo-500"
							on:click={(e) => {
								e.stopPropagation();
								dropdown = true;
							}}
						>
							{username}
							<div class="pl-1"><Icon path={mdiChevronDown} /></div>
						</button>
					</div>
					{#if dropdown}
						<div
							class="origin-top-right absolute right-0 mt-1 min-w-full rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
						>
							<div class="py-1">
									<a
										href="/auth/logout"
										class="text-gray-700 block w-full text-left px-3 py-1 text-sm font-bold">
										Logout
							</a>
							</div>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
