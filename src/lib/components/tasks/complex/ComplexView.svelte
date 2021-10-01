<script>
	import Links from './Links.svelte';
	import Nodes from './Nodes.svelte';

	export let tasks;
	export let progress;
	let errorMsg;

	let columnedTasks = { 0: [] };

	function divideTasks(nextColumnTasks) {
		if (nextColumnTasks == []) {
			return;
		}
		let newNextColumnTasks = [];
		nextColumnTasks.forEach((task) => {
			let col = findColumn(task.prerequisites);
			if (col == undefined) {
				newNextColumnTasks.push(task);
			} else {
				if (columnedTasks[col] == undefined) {
					columnedTasks[col] = [];
				}
				columnedTasks[col].push(task);
			}
		});
		if (nextColumnTasks.length == 0 || newNextColumnTasks == 0) {
			return;
		}
		if (nextColumnTasks.length <= newNextColumnTasks.length) {
			let errorMsg = `Unreachable precondition: <ul class="pl-4" style="list-style-type:square">${nextColumnTasks.map(
				(task) => `<li>[${task.prerequisites}] for task ${task.taskid}</li>`
			)}</ul>`;
			throw new Error(errorMsg);
		}
		return divideTasks(newNextColumnTasks);
	}

	function findColumn(prerequisites, col = 0) {
		if (prerequisites.length == 0) {
			return col;
		}
		let leftPrerequisites = [];
		let columnPrerequisites = unwrapPrerequisites(col);
		if (columnPrerequisites == undefined) {
			return undefined;
		}
		prerequisites.forEach((pre) => {
			if (!columnPrerequisites.includes(pre)) {
				leftPrerequisites.push(pre);
			}
		});
		return findColumn(leftPrerequisites, col + 1);
	}

	function unwrapPrerequisites(col) {
		if (columnedTasks[col] == undefined) return undefined;
		return columnedTasks[col].map((task) => task.taskid);
	}

	try {
		divideTasks(tasks);
	} catch (error) {
		errorMsg = error.message;
	}

	let links = [];
	tasks.forEach((task) => {
		task.prerequisites.forEach((pre) => {
			links.push({ source: pre, target: task.taskid });
		});
	});
</script>

<div class="relative h-full">
	{#if errorMsg != undefined}
		<div class="p-4">
			<p class="font-bold text-xl">
				<span>Fehler: </span>
				<span class="italic"
					>Es ist ein Fehler aufgetreten. Melden Sie dieses Problem an den Kursleiter!</span
				>
			</p>
			{@html errorMsg}
		</div>
	{:else}
		{#each Object.keys(columnedTasks) as key}
			<Nodes tasks={columnedTasks[key]} {progress} {links} {key} />
			<Links {links} {progress} />
		{/each}
	{/if}
</div>
