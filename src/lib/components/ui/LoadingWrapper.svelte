<script>
	import TransitionWrapper from './transitions/TransitionWrapper.svelte';

	export let isLoading;
</script>

{#if isLoading}
	<TransitionWrapper>
		<div class="p-4 h-full">
			<div class="flex flex-wrap justify-center h-full box content-center">
				<div class="lds-ring">
					<div />
					<div />
					<div />
					<div />
				</div>
			</div>
		</div>
	</TransitionWrapper>
{:else}
	<slot />
{/if}

<style lang="postcss">
	.box {
		@apply shadow-md bg-gray-100 rounded;
	}
	/*Source: https://loading.io/css/*/
	.lds-ring {
		display: inline-block;
		position: relative;
		width: 80px;
		height: 80px;
	}
	.lds-ring div {
		box-sizing: border-box;
		display: block;
		position: absolute;
		width: 64px;
		height: 64px;
		margin: 8px;
		border: 8px solid indigo;
		border-radius: 50%;
		animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
		border-color: indigo transparent transparent transparent;
	}
	.lds-ring div:nth-child(1) {
		animation-delay: -0.45s;
	}
	.lds-ring div:nth-child(2) {
		animation-delay: -0.3s;
	}
	.lds-ring div:nth-child(3) {
		animation-delay: -0.15s;
	}
	@keyframes lds-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
