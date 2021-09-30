<!-- <script context="module">
	// Funktioniert nicht!
	import { axiosInstance } from '$lib/auth/auth';

	export async function load({ page }) {
		if (!page.path.startsWith('/auth')) {
			console.log(page)
			return await axiosInstance()
				.get('/user/meta')
				.catch((err) => {
					console.log(err.response.status);
					if (err.response.status == 401) {
						return { status: 302, redirect: '/auth/login' };
					}
				});
		}
		return { status: 200 };
	}
</script> -->
<script>
	import 'virtual:windi.css';

	import { browser } from '$app/env';

	import Navigation from '$lib/components/ui/nav/Navigation.svelte';
	import TopBar from '$lib/components/ui/nav/TopBar.svelte';
	if (browser) import('virtual:windi-devtools');

	import { onMount } from 'svelte';
	import Bean from '$lib/components/avatar/Bean.svelte';
	import user from '$lib/stores/user';
	import { load_course_meta, load_user_character, load_user_meta } from '$lib/api/calls';
	import character from '$lib/stores/character';
	import course from '$lib/stores/course';

	onMount(async () => {
		await load_user_meta();
		await load_user_character();
		await load_course_meta($user.activeCourse);
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
				<Bean character={$character} />
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.viewport-height {
		height: calc(100vh - 64px);
	}

	.box {
		@apply p-4 shadow-md bg-gray-100 rounded;
	}
</style>
