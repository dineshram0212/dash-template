<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
</script>

<Sidebar.SidebarHeader class="p-5 md:p-3">
	<div
		class="group/banner relative flex items-center justify-between gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:pr-0 transition-all duration-300 ease-in-out"
	>
		<div class="flex items-center gap-3 transition-all duration-300 ease-in-out group-data-[collapsible=icon]:gap-0">
			
            <img src="/Symbol.svg" alt="Logo" class="w-7 shrink-0" />
			
            <span
				class="overflow-hidden font-mono text-2xl font-bold whitespace-nowrap transition-[width,opacity] duration-300 ease-in-out group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0"
			>
				Google
			</span>
		</div>

		<Sidebar.SidebarTrigger class="h-8 w-8 group-data-[collapsible=icon]:hidden" />

		<Sidebar.SidebarTrigger
			class="absolute top-1/2 left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover/banner:opacity-100 group-data-[collapsible=icon]:flex"
		/>
	</div>
</Sidebar.SidebarHeader>