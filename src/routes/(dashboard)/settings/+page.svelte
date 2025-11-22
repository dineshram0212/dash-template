<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { SETTINGS_SECTIONS } from '$lib/constants/settings';
	import { page } from '$app/stores';

	// Default to 'general' if no section is specified
	let currentSection = $derived($page.url.searchParams.get('section') || 'general');

	const currentSectionData = $derived(SETTINGS_SECTIONS.find((s) => s.id === currentSection));
</script>

<main class="flex flex-1 flex-col gap-4 overflow-y-auto p-6 md:p-8">
	<div class="mx-auto w-full max-w-4xl">
		{#if currentSectionData}
			<div class="space-y-8">
				<div class="space-y-2">
					<h1 class="text-3xl font-bold tracking-tight">{currentSectionData.title}</h1>
					<p class="text-lg text-muted-foreground">{currentSectionData.description}</p>
				</div>

				<Card.Card class="shadow-sm">
					<Card.CardHeader class="pb-6">
						<Card.CardTitle class="text-xl">{currentSectionData.title} Settings</Card.CardTitle>
						<Card.CardDescription class="text-base">
							Configure your {currentSectionData.title.toLowerCase()} preferences and options.
						</Card.CardDescription>
					</Card.CardHeader>
					<Card.CardContent class="space-y-6 pt-0">
						<!-- Settings content will go here based on the section -->
						{#if currentSection === 'general'}
							<div class="space-y-6">
								<div class="grid gap-2">
									<Label for="language">Language</Label>
									<select
										id="language"
										class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
									>
										<option value="en">English</option>
										<option value="es">Spanish</option>
										<option value="fr">French</option>
									</select>
								</div>
								<div class="grid gap-2">
									<Label for="timezone">Timezone</Label>
									<select
										id="timezone"
										class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
									>
										<option value="utc">UTC</option>
										<option value="est">Eastern Time</option>
										<option value="pst">Pacific Time</option>
									</select>
								</div>
								<Button class="w-fit">Save Changes</Button>
							</div>
						{:else if currentSection === 'profile'}
							<div class="space-y-6">
								<div class="grid gap-2">
									<Label for="name">Full Name</Label>
									<Input id="name" type="text" placeholder="Enter your full name" />
								</div>
								<div class="grid gap-2">
									<Label for="email">Email</Label>
									<Input id="email" type="email" placeholder="Enter your email" />
								</div>
								<Button class="w-fit">Update Profile</Button>
							</div>
						{:else if currentSection === 'notifications'}
							<div class="space-y-6">
								<div class="flex items-center justify-between">
									<div class="space-y-0.5">
										<Label class="text-sm font-medium">Email Notifications</Label>
										<p class="text-sm text-muted-foreground">Receive notifications via email</p>
									</div>
									<input type="checkbox" class="h-4 w-4 rounded border border-input" />
								</div>
								<div class="flex items-center justify-between">
									<div class="space-y-0.5">
										<Label class="text-sm font-medium">Push Notifications</Label>
										<p class="text-sm text-muted-foreground">Receive push notifications</p>
									</div>
									<input type="checkbox" class="h-4 w-4 rounded border border-input" />
								</div>
								<Button class="w-fit">Save Preferences</Button>
							</div>
						{:else if currentSection === 'security'}
							<div class="space-y-6">
								<div class="grid gap-2">
									<Label for="current-password">Current Password</Label>
									<Input id="current-password" type="password" />
								</div>
								<div class="grid gap-2">
									<Label for="new-password">New Password</Label>
									<Input id="new-password" type="password" />
								</div>
								<div class="grid gap-2">
									<Label for="confirm-password">Confirm Password</Label>
									<Input id="confirm-password" type="password" />
								</div>
								<Button class="w-fit">Update Password</Button>
							</div>
						{/if}
					</Card.CardContent>
				</Card.Card>
			</div>
		{:else}
			<div class="space-y-4 text-center">
				<h1 class="text-3xl font-bold tracking-tight">Settings</h1>
				<p class="text-lg text-muted-foreground">
					Select a settings category from the sidebar to get started.
				</p>
			</div>
		{/if}
	</div>
</main>
