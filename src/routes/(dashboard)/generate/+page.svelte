<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Loader2, Wand2, Coins } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import ImageGrid from '$lib/components/screens/image-grid.svelte';
	import ReferenceImageScroll from '$lib/components/generate/ReferenceImageScroll.svelte';
	import CustomPromptList from '$lib/components/generate/CustomPromptList.svelte';
	import AspectRatioPopover from '$lib/components/generate/AspectRatioPopover.svelte';

	let isGenerating = false;
	let generatedImages: any[] = [];

	// State
	let referenceImages: string[] = [];
	let customPrompts: string[] = [];
	let aspectRatio = '2227x3183';
	let imageCount = 1;

	// Mock Data
	const MOCK_GENERATED_IMAGES = [
		{
			id: 1,
			url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
			author: 'Unsplash'
		},
		{
			id: 2,
			url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
			author: 'Unsplash'
		},
		{
			id: 3,
			url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
			author: 'Unsplash'
		},
		{
			id: 4,
			url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=800&auto=format&fit=crop',
			author: 'Unsplash'
		}
	];

	function handleAddReference(file: File) {
		const imageUrl = URL.createObjectURL(file);
		referenceImages = [...referenceImages, imageUrl];
	}

	function handleRemoveReference(index: number) {
		referenceImages = referenceImages.filter((_, i) => i !== index);
	}

	function handleAddPrompt(prompt: string) {
		if (prompt && !customPrompts.includes(prompt)) {
			customPrompts = [...customPrompts, prompt];
		}
	}

	function handleRemovePrompt(index: number) {
		customPrompts = customPrompts.filter((_, i) => i !== index);
	}

	function handleGenerate() {
		isGenerating = true;

		// Parse aspect ratio (e.g., "16:9" or "2227x3183")
		let width = 800;
		let height = 800;

		if (aspectRatio.includes('x')) {
			const [w, h] = aspectRatio.split('x').map(Number);
			width = w;
			height = h;
		} else if (aspectRatio.includes(':')) {
			const [w, h] = aspectRatio.split(':').map(Number);
			// Scale up for better quality while maintaining ratio
			const scale = 800 / Math.max(w, h);
			width = Math.round(w * scale);
			height = Math.round(h * scale);
		}

		// Simulate generation delay
		setTimeout(() => {
			const newImages = Array.from({ length: imageCount }).map((_, i) => {
				// Use Picsum Photos API with specific dimensions
				const randomId = Math.floor(Math.random() * 1000);

				return {
					id: Date.now() + i,
					url: `https://picsum.photos/${width}/${height}?random=${randomId}`,
					author: 'Lorem Picsum',
					width,
					height
				};
			});

			generatedImages = [...newImages, ...generatedImages];
			isGenerating = false;
		}, 2500);
	}
</script>

<div class="flex h-[calc(100vh-4rem)] w-full overflow-hidden">
	<!-- Left Panel: Controls -->
	<div
		class="custom-scrollbar flex w-[400px] min-w-[400px] flex-col gap-6 overflow-y-auto border-r p-6"
	>
		<div class="flex flex-col gap-1">
			<p class="text-md font-semibold text-foreground">Create stunning visuals with AI.</p>
		</div>

		<div class="flex flex-col gap-6">
			<!-- Reference Images -->
			<ReferenceImageScroll
				images={referenceImages}
				onAdd={handleAddReference}
				onRemove={handleRemoveReference}
			/>

			<Separator />

			<!-- Custom Prompts -->
			<CustomPromptList
				prompts={customPrompts}
				onAdd={handleAddPrompt}
				onRemove={handleRemovePrompt}
			/>

			<Separator />

			<!-- Configuration -->
			<div class="grid grid-cols-2 gap-4">
				<div class="flex flex-col gap-2">
					<label class="text-xs font-medium text-muted-foreground">Aspect Ratio</label>
					<AspectRatioPopover bind:value={aspectRatio} />
				</div>
				<div class="flex flex-col gap-2">
					<label class="text-xs font-medium text-muted-foreground">Image Count</label>
					<div
						class="flex h-10 items-center justify-between rounded-xl border border-dashed border-muted-foreground/25 bg-background/50 p-1"
					>
						{#each [1, 2, 3, 4] as count}
							<button
								class="flex h-full flex-1 items-center justify-center rounded-lg text-sm font-medium transition-all {imageCount ===
								count
									? 'bg-primary text-primary-foreground shadow-sm'
									: 'text-muted-foreground hover:bg-muted'}"
								onclick={() => (imageCount = count)}
							>
								{count}
							</button>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="mt-auto pt-6">
			<Button
				size="lg"
				class="h-12 w-full rounded-full text-base transition-all"
				onclick={handleGenerate}
				disabled={isGenerating}
			>
				{#if isGenerating}
					<Loader2 class="mr-2 h-5 w-5 animate-spin" />
					Generating...
				{:else}
					<div class="flex w-full items-center justify-between">
						<div class="flex items-center gap-2">
							<Wand2 class="h-4 w-4" />
							<span>Generate</span>
						</div>
						<div class="flex items-center gap-1 text-xs font-normal opacity-80">
							<Coins class="h-3 w-3 text-yellow-500 dark:text-yellow-600" />
							<span>{imageCount * 4} credits</span>
						</div>
					</div>
				{/if}
			</Button>
		</div>
	</div>

	<!-- Right Panel: Results -->
	<div class="custom-scrollbar flex-1 overflow-y-auto bg-muted/10 p-6">
		{#if generatedImages.length === 0}
			<div class="flex h-full flex-col items-center justify-center gap-4 text-muted-foreground/50">
				<div
					class="flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-dashed border-muted-foreground/10 bg-muted/20"
				>
					<Wand2 class="h-10 w-10" />
				</div>
				<div class="text-center">
					<p class="text-lg font-medium text-foreground/80">Start Creating</p>
					<p class="text-sm">Your generated images will appear here.</p>
				</div>
			</div>
		{:else}
			<div in:fade>
				<ImageGrid items={generatedImages} class="w-full" />
			</div>
		{/if}
	</div>
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: hsl(var(--muted-foreground) / 0.2);
		border-radius: 20px;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: hsl(var(--muted-foreground) / 0.4);
	}
</style>
