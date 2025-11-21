<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { SIDEBAR_SECTIONS } from '$lib/constants/sidebar';
</script>

<Sidebar.Sidebar variant="inset">
	<Sidebar.SidebarContent>
		<Sidebar.SidebarGroup>
			<Sidebar.SidebarGroupLabel>Application</Sidebar.SidebarGroupLabel>
			<Sidebar.SidebarGroupContent>
				<Sidebar.SidebarMenu>
					{#each SIDEBAR_SECTIONS as section}
						<Sidebar.SidebarMenuItem>
							<Sidebar.SidebarMenuButton>
								{#if section.icon}
									<section.icon />
								{/if}
								<span>{section.title}</span>
							</Sidebar.SidebarMenuButton>
						</Sidebar.SidebarMenuItem>
					{/each}
				</Sidebar.SidebarMenu>
			</Sidebar.SidebarGroupContent>
		</Sidebar.SidebarGroup>
	</Sidebar.SidebarContent>
</Sidebar.Sidebar>
