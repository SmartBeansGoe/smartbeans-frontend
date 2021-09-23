<script>
	import TransitionWrapper from '$lib/components/ui/transitions/TransitionWrapper.svelte';
	import Login from '$lib/components/auth/Login.svelte';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';
	import Cookies from 'js-cookie';
	import { goto } from '$app/navigation';

	let render = false;
	beforeUpdate(() => {
		let token = $page.query.get('token');
		if (token != null) {
			Cookies.set('auth_token', token);
			goto('/');
		} else {
			render = true;
		}
	});
</script>

<TransitionWrapper>
	{#if render}
		<Login />
	{/if}
</TransitionWrapper>
