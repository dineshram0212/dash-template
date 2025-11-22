<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
</script>

<Sidebar.SidebarHeader>
	<div
		class="group/banner relative flex items-center justify-between gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:pr-0"
	>
		<div class="flex items-center gap-3 group-data-[collapsible=icon]:group-hover/banner:invisible">
			<img src="/Symbol.svg" alt="Logo" class="w-8 shrink-0" />
			<span
				class="overflow-hidden font-mono text-2xl font-bold whitespace-nowrap group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0"
			>
				Google
			</span>
		</div>
		<!-- Expanded Trigger: Always visible -->
		<Sidebar.SidebarTrigger class="h-8 w-8 group-data-[collapsible=icon]:hidden" />

		<!-- Collapsed Trigger: Visible on hover -->
		<Sidebar.SidebarTrigger
			class="absolute top-1/2 left-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/banner:opacity-100 group-data-[collapsible=icon]:flex"
		/>
	</div>
</Sidebar.SidebarHeader>
