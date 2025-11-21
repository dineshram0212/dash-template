<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { USER_PROFILE_MENU, LOGOUT_ITEM } from '$lib/constants/user-profile';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client';

	let {
		mode = 'avatar',
		class: className,
		session,
		user
	} = $props<{
		mode?: 'avatar' | 'full';
		class?: string;
		session?: any;
		user?: any;
	}>();

	// Use user data if available, otherwise fall back to session.user
	let userData = $derived(user || (session?.user) || session);

	let isFull = $derived(mode === 'full');
	
	async function handleLogout() {
		try {
			await authClient.signOut();
			// Redirect to login after successful logout
			goto('/auth/login');
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
</script>

{#if userData}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={cn('outline-none', className)}>
			<div class={cn('flex items-center gap-3 transition-colors', isFull && 'pr-4')}>
				<Avatar.Root class="h-10 w-10 rounded-xl border">
					<Avatar.Image src={userData.image} alt={userData.name} />
					<Avatar.Fallback>{userData.name?.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>

				{#if isFull}
					<div class="flex flex-col items-start text-sm">
						<span class="font-medium">{userData.name}</span>
						<span class="text-xs text-muted-foreground">{userData.email}</span>
					</div>
					<ChevronDown class="ml-auto h-4 w-4" />
				{/if}
			</div>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content align="end" class="w-56">
			<DropdownMenu.Label class="font-normal">
				<div class="flex flex-col space-y-1">
					<p class="text-sm leading-none font-medium">{userData.name}</p>
					<p class="text-xs leading-none text-muted-foreground">{userData.email}</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />

			{#each USER_PROFILE_MENU as item}
				<DropdownMenu.Item onclick={() => goto(item.href)}>
					<item.icon class="mr-2 h-4 w-4" />
					<span>{item.label}</span>
				</DropdownMenu.Item>
			{/each}

			<DropdownMenu.Separator />

			<DropdownMenu.Item class="text-red-600 focus:text-red-600" onclick={handleLogout}>
				<LOGOUT_ITEM.icon class="mr-2 h-4 w-4" />
				<span>{LOGOUT_ITEM.label}</span>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
