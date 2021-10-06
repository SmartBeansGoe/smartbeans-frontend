export function getNextTask(progress, tasks) {
	let solvedTasks = progress;
	let nextTask = tasks
		.filter((task) => !solvedTasks.includes(task.taskid))
		.sort((a, b) => a.order_by - b.order_by)
		.find((task) => taskPrerequisitesFulfilled(task, progress));
	return nextTask;
}

// CNF ['A', ['B', 'C'], ['D']]
export function taskPrerequisitesFulfilled(task, progress) {
	if (task.prerequisites.length == 0) {
		return true;
	}
	console.log(task.prerequisites);
	let b = task.prerequisites
		.map((pre) => {
			if (Array.isArray(pre)) {
				let bo = pre
					.map((p) => progress.includes(p))
					.reduce((previousValue, currentValue) => previousValue || currentValue);
				console.log(task, bo);
				return bo;
			} else {
				return progress.includes(pre);
			}
		})
		.reduce((previousValue, currentValue) => previousValue && currentValue);
	return b;
}
