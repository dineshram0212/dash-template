<script lang="ts">
	import { Plus, X } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import FloatingPromptInput from '$lib/components/FloatingPromptInput.svelte';

	export let prompts: string[] = [];
	export let onAdd: (prompt: string) => void = () => {};
	export let onRemove: (index: number) => void = () => {};
	export let onUpdate: (index: number, prompt: string) => void = (index, prompt) => {
		prompts[index] = prompt;
	};
</script>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-medium text-muted-foreground">Custom Prompts</h3>
		<FloatingPromptInput {onAdd}>
			{#snippet trigger({ props })}
				<button
					{...props}
					class="cursor-pointer flex p-1 items-center justify-center rounded-full border border-dashed border-muted-foreground/50 transition-colors hover:border-primary hover:bg-secondary/50"
				>
					<Plus class="h-4 w-4" />
				</button>
			{/snippet}
		</FloatingPromptInput>
	</div>

	<ScrollArea class="h-[200px] pr-4">
		{#if prompts.length === 0}
			<div class="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
				<p class="text-xs">No custom prompts added</p>
			</div>
		{:else}
			<div class="flex flex-col gap-2 divide-y">
				{#each prompts as prompt, i}
					<div
						class="group flex items-start justify-between gap-2 border-b border-border py-1 pb-3"
					>
						<FloatingPromptInput mode="edit" {prompt} onUpdate={(newVal) => onUpdate(i, newVal)}>
							{#snippet trigger({ props })}
								<div
									class="py-1 text-left text-sm break-words text-foreground/90 hover:text-primary"
									{...props}
								>
									{prompt}
								</div>
							{/snippet}
						</FloatingPromptInput>
						<div class="flex min-w-[10%] items-center justify-end">
							<Button
								variant="ghost"
								size="icon"
								class="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
								onclick={() => onRemove(i)}
							>
								<X class="h-3.5 w-3.5" />
							</Button>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</ScrollArea>
</div>
