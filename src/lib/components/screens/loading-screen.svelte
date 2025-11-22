<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	data-slot="loading-screen"
	class={cn('flex min-h-svh w-full items-center justify-center bg-background p-8', className)}
	{...restProps}
>
	<div class="flex w-full max-w-2xl flex-col gap-6">
		<Skeleton class="h-6 w-1/3" />

		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<Skeleton class="h-24 rounded-xl" />
			<Skeleton class="h-24 rounded-xl" />
			<Skeleton class="h-24 rounded-xl" />
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-5">
			<div class="col-span-1 md:col-span-3">
				<Skeleton class="h-[300px] w-full rounded-xl" />
			</div>
			<div class="col-span-1 flex flex-col gap-4 md:col-span-2">
				<Skeleton class="h-10 w-full" />
				<Skeleton class="h-10 w-full" />
				<Skeleton class="h-10 w-full" />
				<Skeleton class="h-10 w-full" />
				<Skeleton class="h-10 w-full" />
			</div>
		</div>

		<Skeleton class="mt-4 h-4 w-1/5 self-end" />
	</div>
</div>
