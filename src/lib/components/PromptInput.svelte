<script lang="ts">
	import { Maximize2, Wand2, Globe, LayoutTemplate, Paperclip } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Separator } from '$lib/components/ui/separator';

	let prompt = '';
</script>

<div
	class="relative mx-auto w-full max-w-4xl rounded-3xl bg-background p-4 transition-all duration-300"
>
	<div class="flex flex-col gap-4">
		<!-- Input Area -->
		<div class="relative">
			<Textarea
				bind:value={prompt}
				placeholder="Describe what you want to see"
				class="min-h-[120px] w-full resize-none border-none dark:bg-transparent shadow-none text-lg placeholder:text-muted-foreground focus-visible:ring-0"
			/>
		</div>

		<!-- Bottom Controls -->
		<div class="flex flex-wrap items-center justify-between gap-4 pt-2">
			<!-- Left Controls -->
			<div class="flex items-center gap-2">
				<Button
					variant="ghost"
					size="icon"
					class="h-8 w-8 rounded-full text-muted-foreground hover:bg-secondary/50"
				>
					<Paperclip class="h-4 w-4" />
				</Button>

				<Button
					variant="outline"
					size="sm"
					class="h-8 rounded-full"
				>
					<span class="text-xs font-medium">3.0 Turbo x 4</span>
				</Button>

				<Button
					variant="outline"
					size="sm"
					class="h-8 gap-2 rounded-full"
				>
					<Maximize2 class="h-3.5 w-3.5" />
					<span class="text-xs font-medium">1:1</span>
				</Button>

				<Button
					variant="outline"
					size="sm"
					class="h-8 rounded-full"
				>
					<span class="text-xs font-medium">Realistic</span>
				</Button>
			</div>

			<!-- Right Controls -->
			<div class="flex items-center gap-3">
				<Button
					variant="ghost"
					size="sm"
					class="h-8 gap-2 text-muted-foreground hover:text-foreground"
				>
					<Wand2 class="h-4 w-4" />
					<span class="text-xs font-medium">Auto</span>
				</Button>

				<Button
					variant="ghost"
					size="sm"
					class="h-8 gap-2 text-muted-foreground hover:text-foreground"
				>
					<Globe class="h-4 w-4" />
					<span class="text-xs font-medium">Public</span>
				</Button>

				<Button
					variant="ghost"
					size="sm"
					class="h-8 gap-2 text-muted-foreground hover:text-foreground"
				>
					<LayoutTemplate class="h-4 w-4" />
					<span class="text-xs font-medium">Templates</span>
				</Button>

				<Separator orientation="vertical" class="h-6" />

				<Button
					size="default"
					class="h-9 rounded-xl font-medium"
				>
					Generate
				</Button>
			</div>
		</div>
	</div>
</div>
