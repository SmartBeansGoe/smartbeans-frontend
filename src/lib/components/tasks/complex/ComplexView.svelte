<script>
	import Alert from '$lib/components/ui/Alert.svelte';

	import Links from './Links.svelte';
	import Nodes from './Nodes.svelte';

	export let tasks;
	export let progress;
	let errorMsg;

	let columnedTasks = { 0: [] };
	let filteredTasks = [];
	let nonExistentPrerequisites = [];
	$: [filteredTasks, nonExistentPrerequisites] = filterPrerequisites(tasks);
	$: nonExistentPrerequisitesMessage = (
		'Unfulfilled Prerequisites: ' +
		nonExistentPrerequisites.map((x) => x.nonExistentPrerequisite + ' for ' + x.relatedTask + ';')
	)
		.replaceAll(';,', ' | ')
		.replace(';', '');

	function checkPrerequisiteInTasks(id, taskIds) {
		return taskIds.includes(id);
	}

	function filterPrerequisites(tasks) {
		let filteredTasks = [];
		let taskIds = tasks.map((task) => task.taskid);
		let nonExistentPrerequisites = [];
		tasks.forEach((task) => {
			let newPrerequisites = [];
			task.prerequisites.forEach((pre) => {
				if (Array.isArray(pre)) {
					let tmpNew = [];
					pre.forEach((p) => {
						if (!checkPrerequisiteInTasks(p, taskIds)) {
							nonExistentPrerequisites.push({
								nonExistentPrerequisite: p,
								relatedTask: task.taskid
							});
						} else {
							tmpNew.push(p);
						}
					});
					newPrerequisites.push(tmpNew);
				} else {
					if (!checkPrerequisiteInTasks(pre, taskIds)) {
						nonExistentPrerequisites.push({
							nonExistentPrerequisite: pre,
							relatedTask: task.taskid
						});
					} else {
						newPrerequisites.push(pre);
					}
				}
			});
			filteredTasks.push({ ...task, prerequisites: newPrerequisites });
		});
		return [filteredTasks, nonExistentPrerequisites];
	}

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
		if (nextColumnTasks.length == 0 || newNextColumnTasks.length == 0) {
			return;
		}
		if (nextColumnTasks.length <= newNextColumnTasks.length) {
			let errorMsg = `Unreachable precondition (cyclic graph): <ul class="pl-4" style="list-style-type:square">${nextColumnTasks.map(
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
		let prerequisitesLeft = [];
		let graphTaskIds = unwrapTaskIs(col);
		if (graphTaskIds == undefined) {
			return undefined;
		}
		prerequisites.forEach((pre) => {
			if (Array.isArray(pre)) {
				let subPres = [];
				pre.forEach((p) => {
					if (!graphTaskIds.includes(p)) {
						subPres.push(p);
					}
				});
				if (subPres.length > 0) prerequisitesLeft.push(subPres);
			} else if (!graphTaskIds.includes(pre)) {
				prerequisitesLeft.push(pre);
			}
		});
		return findColumn(prerequisitesLeft, col + 1);
	}

	function unwrapTaskIs(col) {
		if (columnedTasks[col] == undefined) return undefined;
		return columnedTasks[col].map((task) => task.taskid);
	}

	$: try {
		divideTasks(filteredTasks);
	} catch (error) {
		errorMsg = error.message;
	}

	let links = [];
	$: filteredTasks.forEach((task, i) => {
		if (i == 0) {
			links = [];
		}
		task.prerequisites.flat().forEach((pre) => {
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
		<Links {links} {progress} />
		{#each Object.keys(columnedTasks) as key}
			<Nodes tasks={columnedTasks[key]} {progress} {links} {key} />
		{/each}
	{/if}
	{#if nonExistentPrerequisites.length > 0}
		<div class="z-index-100 w-full absolute inset-x-0 bottom-0">
			<Alert message={nonExistentPrerequisitesMessage} />
		</div>
	{/if}
</div>
