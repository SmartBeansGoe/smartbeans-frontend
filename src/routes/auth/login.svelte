<script>
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import Login from '$lib/components/auth/Login.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';

	let render = false;
	onMount(() => {
		let token = $page.query.get('token');
		if (token != null) {
			Cookies.set('auth_token', token);
			goto('/');
		} else {
			render = true;
		}
	});
</script>

<svelte:head><title>Login - SmartBeans</title></svelte:head>

<TransitionWrapper>
	{#if render}
		<Login />
	{/if}
</TransitionWrapper>
