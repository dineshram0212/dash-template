<script lang="ts">
	import { Plus, Image as ImageIcon, Maximize2, Wand2 } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Popover from '$lib/components/ui/popover';

	import type { Snippet } from 'svelte';

	export let buttonText = 'Add Prompt';
	export let onAdd: (prompt: string) => void = () => {};
	export let onUpdate: (prompt: string) => void = () => {};
	export let mode: 'add' | 'edit' = 'add';
	export let trigger: Snippet<[{ props: any }]> | undefined = undefined;

	export let open = false;
	export let prompt = '';

	function handleSubmit() {
		if (prompt.trim()) {
			if (mode === 'edit') {
				onUpdate(prompt);
			} else {
				onAdd(prompt);
			}
			prompt = '';
			open = false;
		}
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			{#if trigger}
				{@render trigger({ props })}
			{:else}
				<Button
					variant="outline"
					class="rounded-full border-dashed border-muted-foreground/50 hover:border-primary hover:bg-secondary/50"
					{...props}
				>
					<Plus class="h-4 w-4" />
					{#if buttonText}<span class="ml-2">{buttonText}</span>{/if}
				</Button>
			{/if}
		{/snippet}
	</Popover.Trigger>
	<Popover.Content
		class="w-[80vw] max-w-[400px] rounded-3xl p-4 md:w-[400px]"
		side="bottom"
		align="start"
	>
		<div class="flex flex-col gap-3">
			<div class="relative">
				<div class="absolute top-3 left-3 text-muted-foreground">
					<ImageIcon class="h-4 w-4" />
				</div>
				<Textarea
					bind:value={prompt}
					placeholder="Describe what you want to add..."
					class="min-h-[100px] resize-none border-none bg-transparent pl-9 shadow-none focus-visible:ring-0"
					autofocus
				/>
			</div>

			<div class="flex items-center justify-between pt-2">
				<div class="flex gap-1">
					<Button variant="ghost" size="icon" class="h-7 w-7 rounded-full text-muted-foreground">
						<Maximize2 class="h-3.5 w-3.5" />
					</Button>
					<Button variant="ghost" size="icon" class="h-7 w-7 rounded-full text-muted-foreground">
						<Wand2 class="h-3.5 w-3.5" />
					</Button>
				</div>
				<div class="flex gap-2">
					<Button variant="ghost" size="sm" class="h-8 rounded-full" onclick={() => (open = false)}>
						Cancel
					</Button>
					<Button size="sm" class="h-8 rounded-full px-4" onclick={handleSubmit}>
						{mode === 'edit' ? 'Update' : 'Add'}
					</Button>
				</div>
			</div>
		</div>
	</Popover.Content>
</Popover.Root>
