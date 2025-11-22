<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import Header from '$lib/components/header.svelte';
	import { page } from '$app/stores';
	let { children } = $props();

	let session = $derived($page.data.session);
	let user = $derived($page.data.user);
</script>

<Sidebar.SidebarProvider class="h-svh overflow-hidden">
	<AppSidebar />
	<Sidebar.SidebarInset
		class="overflow-hidden md:peer-data-[variant=inset]:rounded-none md:peer-data-[variant=inset]:shadow-none"
	>
		<Header {session} {user} />
		<main class="flex flex-1 overflow-hidden p-2 pt-0 md:pl-0">
			<div class="flex flex-1 flex-col gap-4 overflow-y-auto rounded-xl bg-card p-4 shadow-none">
				{@render children()}
			</div>
		</main>
	</Sidebar.SidebarInset>
</Sidebar.SidebarProvider>
