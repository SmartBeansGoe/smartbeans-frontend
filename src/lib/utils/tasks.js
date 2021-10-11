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
	return task.prerequisites
		.map((pre) => {
			if (Array.isArray(pre)) {
				if (pre.length == 0) return true
				return pre
					.map((p) => progress.includes(p))
					.reduce((previousValue, currentValue) => previousValue || currentValue);
			} else {
				return progress.includes(pre);
			}
		})
		.reduce((previousValue, currentValue) => previousValue && currentValue);
}
