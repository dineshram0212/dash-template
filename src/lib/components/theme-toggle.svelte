<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { theme } from '$lib/stores/theme';
	import { onMount } from 'svelte';
	import Button from './ui/button/button.svelte';

	let currentTheme: 'light' | 'dark' = 'light';

	// Subscribe to theme changes
	const unsubscribe = theme.subscribe((value) => {
		currentTheme = value === 'dark' ? 'dark' : 'light';
	});

	onMount(() => {
		theme.initialize();
		return unsubscribe;
	});

	function toggleTheme() {
		const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
		theme.setTheme(newTheme);
	}
</script>

<Button
	onclick={toggleTheme}
	variant="default"
	size="icon"
	aria-label="Toggle theme"
	class="flex h-10 w-full items-center gap-2 overflow-hidden rounded-full px-5 transition-all duration-200 ease-linear group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-2.5!"
>
	{#if currentTheme === 'dark'}
		<Sun />
		<span
			class="text-xs font-normal whitespace-nowrap transition-all duration-200 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0"
			>Switch to Light mode</span
		>
	{:else}
		<Moon />
		<span
			class="text-xs font-normal whitespace-nowrap transition-all duration-200 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0"
			>Switch to Dark mode</span
		>
	{/if}
</Button>
