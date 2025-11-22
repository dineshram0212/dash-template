<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import UserProfile from '$lib/components/user-profile/user-profile.svelte';
	import Notifications from '$lib/components/notifications/notifications.svelte';

	let { session, user } = $props<{ session?: any; user?: any }>();
</script>

<header class="flex shrink-0 items-center gap-2 px-4 py-2">
	<h1 class="text-lg font-semibold">Home</h1>
	<div class="ml-auto flex items-center gap-4">
		<Notifications />
		<UserProfile {session} {user} />
	</div>
</header>
