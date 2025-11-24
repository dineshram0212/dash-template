<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { SIDEBAR_SECTIONS } from '$lib/constants/sidebar';
	import { SUB_SIDEBARS, type SidebarItem } from '$lib/constants/sidebar-config';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { ChevronLeft } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import LogoBanner from '$lib/components/LogoBanner.svelte';

	// Determine current sub-sidebar
	let currentSubSidebar = $derived(
		SUB_SIDEBARS.find((sidebar) => $page.url.pathname.startsWith(sidebar.path))
	);

	// Determine items to show
	let sidebarItems = $derived(
		currentSubSidebar ? currentSubSidebar.items : (SIDEBAR_SECTIONS as SidebarItem[])
	);

	function handleNavigation(item: SidebarItem) {
		if (item.onClick) {
			item.onClick();
		} else if (item.url) {
			goto(item.url);
		}
	}

	function goBack() {
		if (currentSubSidebar?.backUrl) {
			goto(currentSubSidebar.backUrl);
		} else {
			goto('/home');
		}
	}

	function isItemActive(item: SidebarItem, url: URL) {
		// Exact match for pathname
		if (item.url === url.pathname) return true;

		// Handle query params (specifically for settings)
		if (item.url?.includes('?')) {
			const [path, search] = item.url.split('?');
			if (path === url.pathname) {
				const itemParams = new URLSearchParams(search);
				const currentParams = url.searchParams;

				// Check if all item params match current params
				// Special case for 'section' defaulting to 'general'
				const itemSection = itemParams.get('section');
				const currentSection = currentParams.get('section') || 'general';

				if (itemSection && itemSection === currentSection) return true;
			}
		}
		return false;
	}
</script>

<Sidebar.Sidebar variant="inset" collapsible="icon">
	<LogoBanner />
	{#if currentSubSidebar}
		<Sidebar.SidebarGroup class="group-data-[collapsible=icon]:px-1!">
			<Sidebar.SidebarGroupContent>
				<div
					class="animate-[slideDown_0.3s_ease-out_forwards] opacity-0 transition-all duration-200"
				>
					<Sidebar.SidebarMenuButton
						onclick={goBack}
						tooltipContent={currentSubSidebar.backLabel || 'Back'}
						class="h-10 cursor-pointer rounded-full p-5 text-sidebar-foreground transition-all duration-200 ease-linear group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-2.5! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>span]:transition-all [&>span]:duration-200 group-data-[collapsible=icon]:[&>span]:w-0 group-data-[collapsible=icon]:[&>span]:opacity-0 [&>svg]:size-5"
					>
						<ChevronLeft />
						<span>{currentSubSidebar.backLabel || 'Back'}</span>
					</Sidebar.SidebarMenuButton>
				</div>
			</Sidebar.SidebarGroupContent>
		</Sidebar.SidebarGroup>
		<div class="flex h-px w-full items-center px-2">
			<div class="h-full w-full bg-border"></div>
		</div>
	{/if}

	<Sidebar.SidebarContent class="transition-all duration-300 ease-in-out">
		<Sidebar.SidebarGroup class="group-data-[collapsible=icon]:px-1!">
			<Sidebar.SidebarGroupContent>
				<Sidebar.SidebarMenu>
					{#each sidebarItems as item, index (item.title)}
						<Sidebar.SidebarMenuItem
							class="animate-[slideUp_0.2s_ease-out_forwards] opacity-0"
							style="animation-delay: {100 + index * 50}ms"
						>
							<Sidebar.SidebarMenuButton
								onclick={() => handleNavigation(item)}
								tooltipContent={item.title}
								class={cn(
									'h-10 rounded-full p-2.5 text-sidebar-foreground transition-all duration-200 ease-linear group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-2.5! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>span]:transition-all [&>span]:duration-200 group-data-[collapsible=icon]:[&>span]:w-0 group-data-[collapsible=icon]:[&>span]:opacity-0 [&>svg]:size-5',
									isItemActive(item, $page.url)
										? 'bg-sidebar-accent text-sidebar-accent-foreground'
										: ''
								)}
							>
								{#if item.icon}
									<item.icon />
								{/if}
								<span>{item.title}</span>
							</Sidebar.SidebarMenuButton>
						</Sidebar.SidebarMenuItem>
					{/each}
				</Sidebar.SidebarMenu>
			</Sidebar.SidebarGroupContent>
		</Sidebar.SidebarGroup>
	</Sidebar.SidebarContent>

	<Sidebar.SidebarFooter class="group-data-[collapsible=icon]:px-[5px]!">
		<ThemeToggle />
	</Sidebar.SidebarFooter>
</Sidebar.Sidebar>
