<script lang="ts">
	import { page } from '$app/stores';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb';
	import { ChevronRight } from '@lucide/svelte';
	import UserProfile from '$lib/components/user-profile/user-profile.svelte';
	import Notifications from '$lib/components/notifications/notifications.svelte';
	import { BREADCRUMBS, type PageBreadcrumb } from '$lib/constants/breadcrumbs';

	let { session, user } = $props<{ session?: any; user?: any }>();

	// Get breadcrumb config for current page (including query params)
	let breadcrumbConfig = $derived.by(() => {
		const pathname = $page.url.pathname;
		const search = $page.url.search;
		const fullPath = pathname + search;

		// Try full path with query params first, then fall back to pathname only
		return BREADCRUMBS[fullPath] || BREADCRUMBS[pathname] || BREADCRUMBS['/home'];
	});
</script>

<header class="flex shrink-0 flex-col gap-3 px-6 py-3">
	<div class="flex items-center justify-between">
		<div class="flex items-center gap-3">
			<Sidebar.SidebarTrigger class="md:hidden" />

			{#if breadcrumbConfig}
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each breadcrumbConfig.items as item, i}
							<Breadcrumb.Item>
								{#if item.href}
									<Breadcrumb.Link href={item.href} class="text-sm">
										{item.label}
									</Breadcrumb.Link>
								{:else}
									<Breadcrumb.Page class="text-sm font-medium">
										{item.label}
									</Breadcrumb.Page>
								{/if}
							</Breadcrumb.Item>

							{#if i < breadcrumbConfig.items.length - 1}
								<Breadcrumb.Separator>
									<ChevronRight class="h-4 w-4" />
								</Breadcrumb.Separator>
							{/if}
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
			{/if}
		</div>

		<div class="flex items-center gap-4">
			<Notifications />
			<UserProfile {session} {user} />
		</div>
	</div>
</header>
