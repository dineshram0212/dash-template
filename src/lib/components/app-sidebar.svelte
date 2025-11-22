<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { SIDEBAR_SECTIONS } from '$lib/constants/sidebar';
	import { SETTINGS_SECTIONS } from '$lib/constants/settings';
	import ThemeToggle from '$lib/components/theme-toggle.svelte';
	import { ChevronLeft } from '@lucide/svelte';
	import { cn } from '$lib/utils';
	import LogoBanner from '$lib/components/LogoBanner.svelte';

	// Check if we're on settings page
	let isSettingsMode = $derived($page.url.pathname === '/settings');

	// Get current settings section from URL
	let currentSettingsSection = $derived($page.url.searchParams.get('section') || 'general');

	function handleNavigation(section: any) {
		if (section.url === '/settings') {
			goto('/settings');
		} else {
			goto(section.url);
		}
	}

	function handleSettingsNavigation(sectionId: string) {
		goto(`/settings?section=${sectionId}`);
	}

	function goBackToMain() {
		goto('/home');
	}
</script>

<Sidebar.Sidebar variant="inset" collapsible="icon">
	<LogoBanner />
	{#if isSettingsMode}
		<Sidebar.SidebarGroup class="group-data-[collapsible=icon]:px-1!">
			<Sidebar.SidebarGroupContent>
				<div
					class="animate-[slideDown_0.3s_ease-out_forwards] opacity-0 transition-all duration-200"
				>
					<Sidebar.SidebarMenuButton
						onclick={goBackToMain}
						class="h-10 cursor-pointer rounded-full p-5 text-sidebar-foreground transition-all duration-200 ease-linear group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-2.5! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>span]:transition-all [&>span]:duration-200 group-data-[collapsible=icon]:[&>span]:w-0 group-data-[collapsible=icon]:[&>span]:opacity-0 [&>svg]:size-5"
					>
						<ChevronLeft />
						<span>Back</span>
					</Sidebar.SidebarMenuButton>
				</div>
			</Sidebar.SidebarGroupContent>
		</Sidebar.SidebarGroup>
		<div class="flex h-px w-full items-center px-2">
			<div class="h-full w-full bg-border" />
		</div>
	{/if}

	<Sidebar.SidebarContent class="transition-all duration-300 ease-in-out">
		<Sidebar.SidebarGroup class="group-data-[collapsible=icon]:px-1!">
			<Sidebar.SidebarGroupContent>
				<Sidebar.SidebarMenu>
					{#if isSettingsMode}
						<!-- Settings Sections -->
						{#each SETTINGS_SECTIONS as section}
							<Sidebar.SidebarMenuItem
								class="animate-[slideUp_0.2s_ease-out_forwards] opacity-0"
								style="animation-delay: {100 + SETTINGS_SECTIONS.indexOf(section) * 50}ms"
							>
								<Sidebar.SidebarMenuButton
									onclick={() => handleSettingsNavigation(section.id)}
									class={cn(
										'h-10 rounded-full p-5 text-sidebar-foreground transition-all duration-200 ease-linear group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-2.5! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>span]:transition-all [&>span]:duration-200 group-data-[collapsible=icon]:[&>span]:w-0 group-data-[collapsible=icon]:[&>span]:opacity-0 [&>svg]:size-5',
										currentSettingsSection === section.id
											? 'bg-sidebar-accent text-sidebar-accent-foreground'
											: ''
									)}
								>
									<section.icon />
									<span>{section.title}</span>
								</Sidebar.SidebarMenuButton>
							</Sidebar.SidebarMenuItem>
						{/each}
					{:else}
						<!-- Main Sections -->
						{#each SIDEBAR_SECTIONS as section}
							<Sidebar.SidebarMenuItem
								class="animate-[slideUp_0.2s_ease-out_forwards] opacity-0"
								style="animation-delay: {100 + SIDEBAR_SECTIONS.indexOf(section) * 50}ms"
							>
								<Sidebar.SidebarMenuButton
									onclick={() => handleNavigation(section)}
									class={cn(
										'h-10 rounded-full p-2.5 text-sidebar-foreground transition-all duration-200 ease-linear group-data-[collapsible=icon]:mx-0 group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:gap-0! group-data-[collapsible=icon]:p-2.5! hover:bg-sidebar-accent hover:text-sidebar-accent-foreground [&>span]:transition-all [&>span]:duration-200 group-data-[collapsible=icon]:[&>span]:w-0 group-data-[collapsible=icon]:[&>span]:opacity-0 [&>svg]:size-5',
										$page.url.pathname === section.url
											? 'bg-sidebar-accent text-sidebar-accent-foreground'
											: ''
									)}
								>
									{#if section.icon}
										<section.icon />
									{/if}
									<span>{section.title}</span>
								</Sidebar.SidebarMenuButton>
							</Sidebar.SidebarMenuItem>
						{/each}
					{/if}
				</Sidebar.SidebarMenu>
			</Sidebar.SidebarGroupContent>
		</Sidebar.SidebarGroup>
	</Sidebar.SidebarContent>

	<Sidebar.SidebarFooter class="group-data-[collapsible=icon]:px-[5px]!">
		<ThemeToggle />
	</Sidebar.SidebarFooter>
</Sidebar.Sidebar>
