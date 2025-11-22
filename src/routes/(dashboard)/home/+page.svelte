<script lang="ts">
	import ImageGrid from '$lib/components/screens/image-grid.svelte';
	import { MOCK_IMAGES } from '$lib/constants/splash-images';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';

	function handleImageClick(item: any) {
		console.log('Clicked image:', item);
		// You could open a modal/dialog here
	}
</script>

<div class="flex flex-1 flex-col gap-6">
	<!-- Header Section -->
	<div class="flex flex-col gap-2 p-4">
		<h1 class="text-2xl font-bold tracking-tight">Inspiration Gallery</h1>
		<p class="text-muted-foreground">A masonry grid layout adapting to varied aspect ratios.</p>
	</div>

	<!-- Grid Section -->
	<ImageGrid items={MOCK_IMAGES} onImageClick={handleImageClick} />
</div>
