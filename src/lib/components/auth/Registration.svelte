<script>
	import Icon from 'mdi-svelte';
	import { mdiAccount, mdiLock, mdiKey } from '@mdi/js';
	import { goto } from '$app/navigation';
	import { backend_url } from '$lib/config/config';

	let username;
	let password;
	let key;

	let error_msg;

	async function register() {
		let res = await fetch(backend_url + '/auth/register', {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + key
			},
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password,
				displayName: username
			})
		});

		if (res.ok) {
			error_msg = undefined;
			goto('/auth/login');
		} else {
			switch (res.status) {
				default:
					error_msg = 'Server nicht erreichbar. Versuchen Sie es später nochmal!';
					break;
			}
		}
	}
</script>

<div class="flex flex-wrap justify-center h-full content-center">
	<div class="flex flex-wrap justify-center box p-8 w-80">
		<img alt="" class="max-w-32 pb-6" src="../../static/smartbeans-logo.png" loading="lazy" />
		{#if error_msg}
			<div
				class="relative flex w-full flex-wrap items-stretch mb-2 text-red-500 bg-red-200 rounded py-2 px-3"
			>
				{error_msg}
			</div>
		{/if}
		<div class="relative flex w-full flex-wrap items-stretch mb-2">
			<input
				bind:value={username}
				type="text"
				placeholder="Username"
				class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-md border border-blue-300 outline-none focus:outline-none focus:ring-1 w-full pr-1"
			/>
			<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 py-2.5">
				<Icon path={mdiAccount} />
			</span>
		</div>
		<div class="relative flex w-full flex-wrap items-stretch mb-2">
			<input
				bind:value={password}
				type="password"
				placeholder="Password"
				class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-md border border-blue-300 outline-none focus:outline-none focus:ring-1 w-full pr-1"
			/>
			<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 py-2.5">
				<Icon path={mdiLock} />
			</span>
		</div>
		<div class="relative flex w-full flex-wrap items-stretch mb-2">
			<input
				bind:value={key}
				type="text"
				placeholder="Registration Key"
				class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-md border border-blue-300 outline-none focus:outline-none focus:ring-1 w-full pr-1"
			/>
			<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 py-2.5">
				<Icon path={mdiKey} />
			</span>
		</div>
		<div class="w-full grid grid-cols-2 gap-2">
			<div>
				<button
					class="w-full text-blue-500 border-blue-500 border-2 bg-white hover:bg-blue-50 font-bold py-1.5 px-4 rounded"
					on:click={() => goto('/auth/login')}>Login</button
				>
			</div>
			<div>
				<button
					class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					on:click={() => register()}>Register</button
				>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded;
	}
</style>
