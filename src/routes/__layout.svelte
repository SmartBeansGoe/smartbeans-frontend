<script>
	import 'virtual:windi.css';

	import { browser } from '$app/env';

	import Navigation from '../components/layout/Navigation.svelte';
	import TopBar from '../components/layout/TopBar.svelte';
	if (browser) import('virtual:windi-devtools');

	import { axiosInstance } from '../auth/auth';
	import { onMount } from 'svelte';

	let title = "C-Programmierkurs 21/22"; // TODO: load title from store or via api call?

	onMount(() => {
		let axios_inst = axiosInstance();
		axios_inst
			.get('/user/data')
			.then((res) => {
				console.log(res.data.username);
			})
			.catch((error) => {
				console.log(error);
			});
	});
</script>

<div class="relative min-h-screen flex">
	<Navigation />
	<div class="flex-1 bg-gray-200 max-h-screen overflow-y-auto">
		<div class="sticky top-0 bg-gray-200"><TopBar title={title} /></div>
		<div class="grid grid-cols-12">
			<div class="col-span-12 lg:col-span-10"><slot /></div>
			<div class="invisible lg:visible lg:col-span-2 p-4 my-4 mr-4 shadow-md bg-gray-100 rounded">
				Bohne
			</div>
		</div>
	</div>
</div>
