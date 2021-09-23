<script>
  export let level = 0;
  export let maxLevel = 10;
	export let points = 10;
	export let maxPoints = 100;
</script>

<div class="text-2xl font-bold">Level {level} von {maxLevel}</div>
<div class="pt-1">
	<div class="overflow-hidden h-8 mb-4 flex rounded-xl bg-indigo-200 text-sm font-bold">
		<div
			style="width:{(points / maxPoints) * 100}%"
			class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
		>
			{points}/{maxPoints} Punkte
		</div>
	</div>
</div>
