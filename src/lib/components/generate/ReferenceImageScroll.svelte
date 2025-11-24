<script lang="ts">
	import { Plus, X, Image as ImageIcon } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';

	export let images: string[] = [];
	export let onAdd: (file: File) => void = () => {};
	export let onRemove: (index: number) => void = () => {};

	let fileInput: HTMLInputElement;
	let showAll = false;

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files[0]) {
			onAdd(target.files[0]);
			target.value = ''; // Reset
		}
	}

	function triggerUpload() {
		fileInput.click();
	}
</script>

<input
	type="file"
	accept="image/*"
	class="hidden"
	bind:this={fileInput}
	onchange={handleFileChange}
/>

<div class="flex flex-col gap-2">
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-medium text-muted-foreground select-none">Reference Images</h3>
		{#if images.length > 0}
			<Button
				variant="ghost"
				size="sm"
				class="h-auto p-0 text-xs text-muted-foreground select-none hover:text-foreground"
				onclick={() => (showAll = true)}
			>
				View All
			</Button>
		{/if}
	</div>

	<ScrollArea
		orientation="horizontal"
		class="w-full rounded-xl border bg-background/50 p-1 whitespace-nowrap"
	>
		<div class="flex gap-2 p-1">
			<!-- Upload Button -->
			<Button
				variant="outline"
				class="aspect-square h-20 w-20 flex-col gap-1 rounded-lg border-dashed border-muted-foreground/25 select-none hover:border-primary hover:bg-accent/50"
				onclick={triggerUpload}
			>
				<Plus class="h-5 w-5 text-muted-foreground" />
				<span class="text-[10px] text-muted-foreground">Add Ref</span>
			</Button>

			<!-- Images -->
			{#each images as img, i}
				<button
					class="group relative aspect-square h-20 w-20 cursor-pointer"
					onclick={() => {
						/* Handle individual click if needed, maybe open preview */
					}}
				>
					<img
						src={img}
						alt="Reference {i + 1}"
						class="h-full w-full rounded-lg border border-border/50 object-cover select-none"
					/>
					<div
						class="absolute inset-0 rounded-lg bg-black/0 transition-colors group-hover:bg-black/10"
					></div>
					<Button
						variant="destructive"
						size="icon"
						class="absolute -top-1 -right-1 h-5 w-5 rounded-full opacity-0 shadow-sm transition-opacity select-none group-hover:opacity-100"
						onclick={(e) => {
							e.stopPropagation();
							onRemove(i);
						}}
					>
						<X class="h-3 w-3" />
					</Button>
				</button>
			{/each}
		</div>
	</ScrollArea>

	{#if showAll}
		<!-- Custom Full Screen Overlay -->
		<div
			class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
			onclick={() => (showAll = false)}
		>
			<div
				class="relative h-[80vh] w-[80vw] max-w-5xl overflow-hidden rounded-3xl bg-background shadow-2xl"
				onclick={(e) => e.stopPropagation()}
			>
				<div class="flex items-center justify-between border-b p-6">
					<h2 class="text-xl font-semibold">Reference Images</h2>
					<Button
						variant="ghost"
						size="icon"
						class="rounded-full"
						onclick={() => (showAll = false)}
					>
						<X class="h-5 w-5" />
					</Button>
				</div>

				<div class="h-full overflow-y-auto p-6 pb-20">
					<div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
						<button
							class="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-muted-foreground/25 transition-all hover:border-primary hover:bg-accent/50"
							onclick={() => {
								triggerUpload();
							}}
						>
							<div class="rounded-full bg-muted p-4">
								<Plus class="h-6 w-6 text-muted-foreground" />
							</div>
							<span class="text-sm font-medium text-muted-foreground">Add New</span>
						</button>

						{#each images as img, i}
							<div
								class="group relative aspect-square overflow-hidden rounded-2xl border bg-muted/20"
							>
								<img
									src={img}
									alt="Reference {i + 1}"
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								/>
								<div
									class="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10"
								></div>

								<!-- Overlay Actions -->
								<div
									class="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100"
								>
									<Button
										variant="destructive"
										size="icon"
										class="h-8 w-8 rounded-full shadow-md"
										onclick={() => onRemove(i)}
									>
										<X class="h-4 w-4" />
									</Button>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
