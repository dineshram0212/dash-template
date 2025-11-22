<script lang="ts">
	import { cn } from '$lib/utils';
	import { Skeleton } from '$lib/components/ui/skeleton';

	type ImageItem = {
		id: string | number;
		url: string;
		alt?: string;
		width?: number;
		height?: number;
		author?: string;
		[key: string]: any; // Allow other props
	};

	let {
		items = [],
		class: className,
		onImageClick
	} = $props<{
		items: ImageItem[] | Record<string, ImageItem>;
		class?: string;
		onImageClick?: (item: ImageItem) => void;
	}>();

	// Normalize items to array whether it's an object or array
	let normalizedItems = $derived(Array.isArray(items) ? items : Object.values(items));

	// Helper to calculate aspect ratio for smooth loading placeholders
	function getAspectRatio(width?: number, height?: number) {
		if (!width || !height) return 'auto';
		return `${width} / ${height}`;
	}
</script>

<div class={cn('w-full', className)}>
	{#if normalizedItems.length === 0}
		<div class="flex flex-col items-center justify-center py-12 text-muted-foreground">
			<p>No images to display</p>
		</div>
	{:else}
		<!-- Masonry Layout using CSS Columns -->
		<div class="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
			{#each normalizedItems as item (item.id || item.url)}
				<!-- Container for break avoidance -->
				<div class="break-inside-avoid">
					<button
						class="group relative w-full overflow-hidden rounded-xl bg-muted transition-all hover:shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
						onclick={() => onImageClick?.(item)}
						style="aspect-ratio: {getAspectRatio(item.width, item.height)}"
					>
						<!-- Image -->
						<img
							src={item.url}
							alt={item.alt || 'Gallery image'}
							loading="lazy"
							class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
						/>

						<!-- Overlay (Visible on Hover) -->
						<div
							class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
						></div>

						<!-- Content Overlay -->
						<div
							class="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							{#if item.author}
								<p class="truncate text-xs font-medium text-white drop-shadow-md">
									by {item.author}
								</p>
							{/if}
						</div>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
