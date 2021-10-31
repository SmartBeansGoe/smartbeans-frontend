<script>
	import { goto } from '$app/navigation';

	import { progress, tasks } from '$lib/stores/stores';
	import { getNextTask } from '$lib/utils/tasks';
	import Tag from '../ui/Tag.svelte';

	$: task = getNextTask($progress, $tasks);
</script>

{#if task}
	<div
		class="h-full cursor-pointer overflow-y-hidden"
		on:click={() => goto(`/tasks/${task.taskid}`)}
	>
		<div class="m-4">
			<p class="text-2xl">
				<b>Nächste Aufgabe:</b> <i>{task.task_description.title}</i>
			</p>
			<div class="pt-3">
				<span class="pr-4">{task.task_description.shortname}:</span>
				<span>
					{#each task.tags as tag}
						<Tag
							color="link"
							on:click={(event) => {
								event.stopPropagation();
								goto(`/tasks?category=${tag.name}`);
							}}
						>
							{tag.name}
						</Tag>
					{/each}
				</span>
			</div>
		</div>
	</div>
{/if}
