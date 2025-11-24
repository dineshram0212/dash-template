<script lang="ts">
  import { cn } from '$lib/utils';

  type ImageItem = {
    id: string | number;
    url: string;
    alt?: string;
    author?: string;
    [key: string]: any;
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

  let innerWidth = $state(0);

  // 1. Normalize items
  let normalizedItems = $derived(Array.isArray(items) ? items : Object.values(items));

  // 2. Determine column count based on Tailwind breakpoints
  // sm: 640px, md: 768px, lg: 1024px
  let columnCount = $derived.by(() => {
    if (innerWidth < 640) return 1;
    if (innerWidth < 768) return 2;
    if (innerWidth < 1024) return 3;
    return 4;
  });

  // 3. Distribute items into "Pillars" (Buckets)
  // This ensures Item 1 -> Col 1, Item 2 -> Col 2, Item 3 -> Col 3...
  let columns = $derived.by(() => {
    const cols: ImageItem[][] = Array.from({ length: columnCount }, () => []);
    
    normalizedItems.forEach((item, i) => {
      cols[i % columnCount].push(item);
    });
    
    return cols;
  });
</script>

<svelte:window bind:innerWidth />

<div class={cn('w-full', className)}>
  {#if normalizedItems.length === 0}
    <div class="flex flex-col items-center justify-center py-12 text-muted-foreground">
      <p>No images to display</p>
    </div>
  {:else}
    <div class="flex gap-4 items-start">
      {#each columns as col, colIndex}
        <div class="flex flex-col gap-4 flex-1 min-w-0">
          {#each col as item (item.id || item.url)}
            <button
              class="group relative w-full overflow-hidden rounded-xl bg-muted transition-all hover:shadow-md focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:outline-none"
              onclick={() => onImageClick?.(item)}
            >
              <img
                src={item.url}
                alt={item.alt || 'Gallery image'}
                loading="lazy"
                class="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div
                class="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20"
              ></div>

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
          {/each}
        </div>
      {/each}
    </div>
  {/if}
</div>