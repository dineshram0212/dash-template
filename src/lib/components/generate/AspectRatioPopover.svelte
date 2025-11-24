<script lang="ts">
	import { RectangleHorizontal, RectangleVertical, Square, ChevronDown } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils';

	export let value = '2227x3183';
	export let onSelect: (ratio: string) => void = () => {};

	const RATIOS = [
		{ label: 'Portrait', value: '2227x3183', icon: RectangleVertical, desc: '9:16' },
		{ label: 'Square', value: '1:1', icon: Square, desc: '1:1' },
		{ label: 'Landscape', value: '16:9', icon: RectangleHorizontal, desc: '16:9' }
	];

	let open = false;

	$: selectedRatio = RATIOS.find((r) => r.value === value) || RATIOS[0];
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				variant="outline"
				class="w-full justify-between rounded-xl border-dashed border-muted-foreground/25 bg-background/50 hover:bg-accent/50"
				{...props}
			>
				<div class="flex items-center gap-2">
					<svelte:component this={selectedRatio.icon} class="h-4 w-4 text-muted-foreground" />
					<span>{selectedRatio.label}</span>
					<span class="text-xs text-muted-foreground">({selectedRatio.desc})</span>
				</div>
				<ChevronDown class="h-4 w-4 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[280px] p-3" align="start">
		<div class="grid grid-cols-3 gap-2">
			{#each RATIOS as ratio}
				<button
					class={cn(
						'flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-muted bg-transparent p-3 transition-all hover:border-primary/50 hover:bg-accent/50',
						value === ratio.value && 'border-primary bg-accent text-accent-foreground'
					)}
					onclick={() => {
						value = ratio.value;
						onSelect(ratio.value);
						open = false;
					}}
				>
					<svelte:component this={ratio.icon} class="h-6 w-6" />
					<div class="flex flex-col items-center gap-1 text-center leading-none">
						<span class="text-xs font-medium">{ratio.label}</span>
						<span class="text-[10px] text-muted-foreground">{ratio.desc}</span>
					</div>
				</button>
			{/each}
		</div>
	</Popover.Content>
</Popover.Root>
