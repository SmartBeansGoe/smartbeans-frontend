<script>
	import { goto } from '$app/navigation';

	import { progress, tasks } from '$lib/stores/stores';
	import { getNextTask } from '$lib/utils/tasks';
	import marked from 'marked';

	$: task = getNextTask($progress, $tasks);
</script>

{#if task}
	<div
		class="h-full cursor-pointer overflow-y-hidden"
		on:click={() => goto(`/tasks/${task.taskid}`)}
	>
		<div class=" m-4 ">
			<p class="text-2xl"><b>Nächste Aufgabe:</b> <i>{task.task_description.shortname}</i></p>
			<div>
				{#each task.tags as tag}
					<div
						class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-indigo-600 bg-indigo-200 hover:bg-indigo-300 hover:text-indigo-600 uppercase last:mr-0 mr-1 hover:cursor-pointer"
						on:click={(event) => {
							event.stopPropagation();
							goto(`/tasks?category=${tag.name}`);
						}}
					>
						{tag.name}
					</div>
				{/each}
			</div>
			<div class="">
				<p class="italic">{@html marked(task.task_description.task)}</p>
			</div>
		</div>
	</div>
{/if}
