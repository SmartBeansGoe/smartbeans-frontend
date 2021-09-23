<script>
	import { goto } from '$app/navigation';
	import { axiosInstance } from '$lib/auth/auth';
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';

	let statusText;
	let status;
	onMount(() => {
		if (Cookies.get('auth_token') == undefined) {
			status = 200;
			statusText = 'Melden Sie sich an. Sie sind nicht eingeloggt!';
		} else {
			axiosInstance()
				.delete('/auth/logout/' + Cookies.get('auth_token'))
				.then((res) => {
					status = res.status;
					if (status == 200) {
						Cookies.remove('auth_token');
						statusText = 'Sie wurden erfolgreich ausgeloggt!';
					}
				})
				.catch((err) => {
					status = err.response.status
					statusText = 'Fehler beim Ausloggen: ' + err.response.statusText
				});
		}
	});
</script>

<TransitionWrapper>
	<div class="flex flex-wrap justify-center content-center h-full">
		<div class="flex flex-wrap justify-center box p-8 w-80">
			<img alt="" class="max-w-32 pb-6" src="../../static/smartbeans-logo.png" />
			{#if status == 200}
				<div
					class="relative flex w-full flex-wrap items-stretch mb-2 text-green-500 bg-green-200 rounded py-2 px-3"
				>
					{statusText}
				</div>
        {:else}
        <div
        class="relative flex w-full flex-wrap items-stretch mb-2 text-red-500 bg-red-200 rounded py-2 px-3"
      >
        {statusText}
      </div>
			{/if}
			<div class="w-full grid grid-cols-2 gap-2">
				<div>
					<button
						class="w-full text-blue-500 border-blue-500 border-2 bg-white hover:bg-blue-50 font-bold py-1.5 px-4 rounded"
						on:click={() => goto('/auth/register')}>Register</button
					>
				</div>
				<div>
					<button
						class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
						on:click={() => goto('/auth/login')}>Login</button
					>
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
