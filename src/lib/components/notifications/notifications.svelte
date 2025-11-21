<script lang="ts">
	import { Bell, Check, Info, AlertCircle, Sparkles } from '@lucide/svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';

	let { hasUnread = true } = $props<{ hasUnread?: boolean }>();

	const notifications = [
		{
			title: 'New feature available',
			description: 'Check out the new dashboard view with advanced analytics.',
			time: '2m ago',
			icon: Sparkles,
			color: 'text-indigo-500',
			bg: 'bg-indigo-500/10',
			unread: true
		},
		{
			title: 'System update',
			description: 'Maintenance scheduled for tonight at 12:00 AM UTC.',
			time: '1h ago',
			icon: Info,
			color: 'text-blue-500',
			bg: 'bg-blue-500/10',
			unread: true
		},
		{
			title: 'Welcome to Persona',
			description: 'Thanks for joining! Get started by creating your first persona.',
			time: '1d ago',
			icon: Check,
			color: 'text-green-500',
			bg: 'bg-green-500/10',
			unread: false
		}
	];
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class="outline-none">
		<div
			class="relative flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-muted"
		>
			<Bell class="h-4 w-4 text-muted-foreground transition-colors hover:text-foreground" />
			{#if hasUnread}
				<span
					class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-500 ring-2 ring-background"
				></span>
			{/if}
		</div>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-[300px] max-w-[350px] p-0">
		<div class="flex items-center justify-between border-b px-4 py-2">
			<h4 class="text-sm font-semibold text-muted-foreground">Notifications</h4>
			<Button
				variant="ghost"
				size="sm"
				class="h-auto p-2 text-xs text-muted-foreground hover:text-primary"
			>
				Mark all as read
			</Button>
		</div>
		<div class="flex max-h-[400px] flex-col overflow-y-auto">
			{#each notifications as notification}
				<DropdownMenu.Item
					class="flex cursor-pointer items-start gap-3 p-4 focus:bg-muted/50 data-[highlighted]:bg-muted/50"
				>
					<div
						class={cn(
							'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
							notification.bg
						)}
					>
						<notification.icon class={cn('h-4 w-4', notification.color)} />
					</div>
					<div class="flex min-w-0 flex-1 flex-col gap-1">
						<div class="flex items-center justify-between gap-2">
							<span
								class={cn(
									'text-sm leading-none font-medium',
									notification.unread && 'text-foreground'
								)}
							>
								{notification.title}
							</span>
							<span class="shrink-0 text-[10px] text-muted-foreground">{notification.time}</span>
						</div>
						<p class="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
							{notification.description}
						</p>
					</div>
					{#if notification.unread}
						<div class="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500"></div>
					{/if}
				</DropdownMenu.Item>
			{/each}
		</div>
		<div class="border-t bg-muted/20 p-2">
			<Button variant="ghost" size="sm" class="h-8 w-full text-xs text-muted-foreground">
				View all notifications
			</Button>
		</div>
	</DropdownMenu.Content>
</DropdownMenu.Root>
