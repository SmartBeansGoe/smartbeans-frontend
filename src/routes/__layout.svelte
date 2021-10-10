<script context="module">
	export async function load() {
		if (userEmpty()) await getUser();
		if (courseEmpty()) await getCourse();
		if (characterEmpty()) await getCharacter();
		if (tasksEmpty()) await getTasks();
		if (progressEmpty()) await getProgress();
		return { status: 200 };
	}
</script>

<script>
	import 'virtual:windi.css';

	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { browser } from '$app/env';

	import Navigation from '$lib/components/ui/nav/Navigation.svelte';
	import TopBar from '$lib/components/ui/nav/TopBar.svelte';
	if (browser) import('virtual:windi-devtools');

	import {
		user,
		course,
		character,
		getUser,
		updateToken,
		userEmpty,
		courseEmpty,
		getCourse,
		characterEmpty,
		getCharacter,
		getTasks,
		tasksEmpty,
		progressEmpty,
		getProgress
	} from '$lib/stores/stores';
	import Bean from '$lib/components/avatar/Bean.svelte';
	import { onMount } from 'svelte';

	onMount(async () => {
		updateToken();
		if (userEmpty()) await getUser();
		if (courseEmpty()) await getCourse();
		if (characterEmpty()) await getCharacter();
		if (tasksEmpty()) await getTasks();
		if (progressEmpty()) await getProgress();
	});
	$: username = $user.username;
	$: title = $user.activeCourse ? $course.title : '';
	$: courseConfig = $course.config;
</script>

<div class="relative min-h-screen flex overflow-hidden">
	<Navigation {courseConfig} />
	<div class="flex-1 bg-gray-200 max-h-screen">
		<TopBar {title} {username} />
		<div class="grid grid-cols-12">
			<div class="col-span-12 lg:col-span-10 viewport-height overflow-hidden"><slot /></div>
			<div class="invisible lg:visible lg:col-span-2 box my-4 mr-4">
				<p class="flex justify-center font-bold text-xl">
					{$user.displayName ? $user.displayName : ''}
				</p>
				<Bean character={$character} />
			</div>
		</div>
	</div>
</div>

<div class="toast-position">
	<SvelteToast options={{ duration: 2000 }} />
</div>

<style lang="postcss">
	.toast-position {
		--toastContainerTop: auto;
		--toastContainerRight: 2rem;
		--toastContainerBottom: 1rem;
		--toastContainerLeft: auto;
	}

	.viewport-height {
		height: calc(100vh - 64px);
	}

	.box {
		@apply p-4 shadow-md bg-gray-100 rounded;
	}
</style>
