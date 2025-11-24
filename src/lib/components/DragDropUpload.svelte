<script lang="ts">
	import { Upload, X, Image as ImageIcon } from '@lucide/svelte';
	import { fade, scale } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';

	export let label = 'Click or drag image to upload';

	let dragging = false;
	let files: FileList | null = null;
	let previewUrl: string | null = null;

	function handleDragEnter(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		dragging = true;
	}

	function handleDragLeave(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		dragging = false;
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		dragging = true;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		dragging = false;

		if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
		}
	}

	function handleChange(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.files && target.files.length > 0) {
			handleFiles(target.files);
		}
	}

	function handleFiles(fileList: FileList) {
		files = fileList;
		const file = files[0];
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.onload = (e) => {
				previewUrl = e.target?.result as string;
			};
			reader.readAsDataURL(file);
		}
	}

	function removeFile() {
		files = null;
		previewUrl = null;
	}
</script>

<div
	class="relative mx-auto w-full max-w-4xl rounded-3xl border border-dashed border-muted-foreground/25 bg-background p-4 transition-all duration-300 hover:bg-background/50 {dragging
		? 'ring-2 ring-primary'
		: ''}"
	on:dragenter={handleDragEnter}
	on:dragleave={handleDragLeave}
	on:dragover={handleDragOver}
	on:drop={handleDrop}
	role="button"
	tabindex="0"
>
	{#if previewUrl}
		<div class="relative h-[300px] w-full overflow-hidden rounded-2xl" in:scale>
			<img src={previewUrl} alt="Preview" class="h-full w-full object-cover" />
			<div class="absolute top-4 right-4">
				<Button
					variant="secondary"
					size="icon"
					class="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
					onclick={removeFile}
				>
					<X class="h-4 w-4" />
				</Button>
			</div>
		</div>
	{:else}
		<div
			class="flex min-h-[200px] w-full flex-col items-center justify-center gap-4 rounded-2xl transition-colors"
		>
			<div class="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
				<Upload class="h-8 w-8 text-muted-foreground" />
			</div>
			<div class="text-center">
				<p class="text-lg font-medium">{label}</p>
				<p class="text-sm text-muted-foreground">Supports JPG, PNG, WEBP</p>
			</div>
			<input
				type="file"
				accept="image/*"
				class="absolute inset-0 cursor-pointer opacity-0"
				on:change={handleChange}
			/>
		</div>
	{/if}
</div>
