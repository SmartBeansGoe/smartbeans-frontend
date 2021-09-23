<script>
	export let title;
	export let solvedNum;
	export let maxNum;
</script>

<!-- TODO: MIT LICENSE CREATIVE TIM PROGESS BAR -->
<div class="flex justify-between">
	<div class="relative w-full">
		<div class="flex items-center justify-between">
			<div>
				<span class="font-semibold inline-block px-2 uppercase text-emerald-800">
					<p class="text-xl font-bold capitalize">{title}</p>
				</span>
			</div>
			<p
				class="text-right flex text-2xl flex-wrap content-center p-2 diagonal-fractions text-emerald-600"
			>
				{solvedNum}/{maxNum}
			</p>
		</div>
		<div class="overflow-hidden h-2 mb-3 flex rounded bg-emerald-200">
			<div style="width:{(100 * solvedNum) / maxNum}%" class="bg-emerald-500" />
		</div>
	</div>
</div>
