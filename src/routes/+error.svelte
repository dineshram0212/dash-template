<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<div
	class="flex min-h-svh w-full flex-col items-center justify-center bg-background p-4 text-center"
>
	<div class="relative mb-8 flex items-center justify-center">
		<svg
			width="180"
			height="180"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="0.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="text-muted-foreground/20"
		>
			<circle cx="12" cy="12" r="10" />
			<path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
			<path d="M2 12h20" />
		</svg>

		<div class="absolute inset-0 flex items-center justify-center">
			<span class="text-4xl font-bold tracking-tighter text-foreground">
				{$page.status}
			</span>
		</div>
	</div>

	<h1 class="mb-2 text-2xl font-semibold tracking-tight text-foreground">
		{$page.status === 404 ? 'Page not found' : 'Something went wrong'}
	</h1>

	<p class="mb-8 max-w-[400px] text-muted-foreground">
		{$page.error?.message ||
			"We couldn't find the page you were looking for. It might have been moved or deleted."}
	</p>

	<div class="flex gap-4">
		<Button href="/" variant="default">Go Home</Button>
		<Button variant="ghost" onclick={() => history.back()}>Go Back</Button>
	</div>
</div>
