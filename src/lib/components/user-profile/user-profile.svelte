<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { USER_PROFILE_MENU } from '$lib/constants/user-profile';
	import { cn } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client';
	import { MenuItem } from '../ui/sidebar';

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
	let userData = $derived(user || session?.user || session);
	let isFull = $derived(mode === 'full');

	async function handleLogout() {
		try {
			await authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						window.location.href = '/auth/login';
					}
				}
			});
		} catch (error) {
			console.error('Logout failed:', error);
		}
	}
</script>

{#if userData}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger class={cn('outline-none', className)}>
			<div class={cn('flex items-center gap-3 transition-colors', isFull && 'pr-4')}>
				<Avatar.Root class="h-10 w-10 border">
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
			<DropdownMenu.Item class="flex cursor-pointer items-center gap-2 p-3 font-normal">
				<Avatar.Root class="h-10 w-10 border">
					<Avatar.Image src={userData.image} alt={userData.name} />
					<Avatar.Fallback>{userData.name?.charAt(0)}</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col space-y-1">
					<p class="text-sm leading-none font-medium">{userData.name}</p>
					<p class="text-xs leading-none text-muted-foreground">{userData.email}</p>
				</div>
			</DropdownMenu.Item>

			{#each USER_PROFILE_MENU as item}
				{#if item.label === 'Logout'}
					<DropdownMenu.Item class="group cursor-pointer p-3 transition-all" onclick={handleLogout}>
						<span class="group-hover:text-red-600">{item.label}</span>
					</DropdownMenu.Item>
				{:else}
					<DropdownMenu.Item onclick={() => goto(item.href)} class="cursor-pointer p-3">
						<span>{item.label}</span>
					</DropdownMenu.Item>
				{/if}
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
