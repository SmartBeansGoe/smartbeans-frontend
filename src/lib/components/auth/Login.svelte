<script>
	import Icon from 'mdi-svelte';
	import { mdiAccount, mdiLock, mdiIdentifier } from '@mdi/js';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';
	import { backend_url } from '$lib/config/config';
	import axios from 'axios';
	let username = '';
	let password = '';
	let course = '';

	let error_msg;

	function login() {
		axios
			.post(
				backend_url + '/auth/login/password',
				{
					username: username,
					password: password,
					course: course
				},
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}
				}
			)
			.then((res) => {
				Cookies.set('auth_token', res.data.token);
				goto('/');
			})
			.catch((err) => {
				switch (err.response.status) {
					case 400:
						error_msg = 'Wrong input data';
						break;
					case 401:
						error_msg = 'Wrong password';
						break;
					case 403:
						error_msg = 'No password set for this user';
						break;
					case 404:
						error_msg = 'Non-existing user or course';
						break;
					default:
						error_msg = 'Server nicht erreichbar. Versuchen Sie es später nochmal!';
						break;
				}
			});
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
			<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 pt-3">
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
			<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 pt-3">
				<Icon path={mdiLock} />
			</span>
		</div>
		<div class="relative flex w-full flex-wrap items-stretch mb-2">
			<input
				bind:value={course}
				type="text"
				placeholder="CourseID"
				class="px-3 py-3 placeholder-gray-300 text-gray-600 relative bg-white rounded text-md border border-blue-300 outline-none focus:outline-none focus:ring-1 w-full pr-1"
			/>
			<span class="z-10 h-full text-gray-400 absolute bg-transparent w-8 right-0 pt-3">
				<Icon path={mdiIdentifier} />
			</span>
		</div>
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
					on:click={() => login()}>Login</button
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
