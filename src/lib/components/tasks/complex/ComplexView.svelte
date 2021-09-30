<script>
	import Links from './Links.svelte';
	import Nodes from './Nodes.svelte';

	export let tasks;

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
			throw new Error(
				`Unreachable precondition: \n${nextColumnTasks.map(
					(task) => `\t[${task.prerequisites}] for task ${task.taskid}\n`
				)}`
			);
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

	divideTasks(tasks);

	let links = [];
	tasks.forEach((task) => {
		task.prerequisites.forEach((pre) => {
			links.push({ source: pre, target: task.taskid });
		});
	});
</script>

<div class="relative h-full overflow-auto">
	{#each Object.keys(columnedTasks) as key}
		<Nodes tasks={columnedTasks[key]} {links} {key} />
		<Links {links} />
	{/each}
</div>
