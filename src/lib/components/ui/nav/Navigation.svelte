<script>
	import NavigationItem from './NavigationItem.svelte';
	import Icon from 'mdi-svelte';
	import { mdiAccount, mdiCodeGreaterThanOrEqual, mdiMedal, mdiViewDashboard } from '@mdi/js';

	export let courseConfig = {
		gamification: {
			leaderboard: {
				active: false
			}
		},
		tasks: {
			standardView: {
				active: true,
				title: 'Aufgaben'
			},
			complexView: {
				active: false,
				title: 'Aufgabengraph'
			}
		}
	};
</script>

<div
	class="group transition-width duration-200 hover:w-48 ease-in-out w-16 text-white xl:w-48 bg-gray-600 px-2"
>
	<div class="flex items-center py-2">
		<img alt="" class="max-w-12" src="/smartbeans-logo.png" />
		<span class="pl-4 group-hover:flex hidden xl:flex text-2x1 font-extrabold">SmartBeans</span>
	</div>
	<nav class="justify-center">
		<div class="mb-2 border-b-1 border-dotted border-gray-500" />
		<NavigationItem cls="group-hover:visible" link="/">
			<span slot="prepend">
				<Icon path={mdiViewDashboard} />
			</span>
			<span>Dashboard</span>
		</NavigationItem>
		{#if courseConfig.tasks.standardView.active}
			<NavigationItem cls="group-hover:visible" link="/tasks"
				><span slot="prepend">
					<Icon path={mdiCodeGreaterThanOrEqual} />
				</span><span>{courseConfig.tasks.standardView.title}</span></NavigationItem
			>
		{/if}
		{#if courseConfig.tasks.complexView.active}
			<NavigationItem cls="group-hover:visible" link="/tasks/graph"
				><span slot="prepend">
					<Icon path={mdiCodeGreaterThanOrEqual} />
				</span><span>{courseConfig.tasks.complexView.title}</span></NavigationItem
			>
		{/if}
		{#if courseConfig.gamification.leaderboard.active}
			<NavigationItem cls="group-hover:visible" link="/scores"
				><span slot="prepend">
					<Icon path={mdiMedal} />
				</span><span>Leaderboard</span></NavigationItem
			>
		{/if}
		<div class="my-2 border-b-1 border-dotted border-gray-500" />
		<NavigationItem cls="group-hover:visible" link="/account"
			><span slot="prepend">
				<Icon path={mdiAccount} />
			</span><span>Profil</span></NavigationItem
		>
	</nav>
</div>
