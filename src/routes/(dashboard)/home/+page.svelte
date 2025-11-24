<script lang="ts">
	import ImageGrid from '$lib/components/screens/image-grid.svelte';
	import PromptInput from '$lib/components/PromptInput.svelte';
	import DragDropUpload from '$lib/components/DragDropUpload.svelte';
	import FloatingPromptInput from '$lib/components/FloatingPromptInput.svelte';
	import { MOCK_IMAGES } from '$lib/constants/splash-images';

	function handleImageClick(item: any) {
		console.log('Clicked image:', item);
		// You could open a modal/dialog here
	}
</script>

<div class="flex flex-1 flex-col gap-6">
	<!-- Prompt Input Section -->
	<div class="flex flex-col gap-4 p-4 pb-0">
		<PromptInput />
		<DragDropUpload />
		<div class="flex justify-start">
			<FloatingPromptInput />
		</div>
	</div>

	<!-- Header Section -->
	<div class="flex flex-col gap-2 px-4">
		<p class="text-muted-foreground">Your creations.</p>
	</div>

	<!-- Grid Section -->
	<ImageGrid items={MOCK_IMAGES} onImageClick={handleImageClick} />
</div>
