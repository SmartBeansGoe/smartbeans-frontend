export function getNextTask(progress, tasks) {
	let solvedTasks = progress;
	let unsolvedTask = tasks
		.filter((task) => !solvedTasks.includes(task.taskid))
		.sort((a, b) => a.order_by - b.order_by)
		.find((task) => task.prerequisites.filter((pre) => !solvedTasks.includes(pre)).length == 0);
	return unsolvedTask;
}
