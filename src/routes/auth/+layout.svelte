<script lang="ts">
	import { page } from '$app/state';
	import { authClient } from '@/lib/client';
	import Button from '@/lib/components/ui/button/button.svelte';
	let { children } = $props();
	let login = $derived(page.url.pathname.includes('/login'));

	const HEADER_TEXT = {
		login: {
			title: 'Welcome Back',
			subtitle: 'Sign in to your account'
		},
		signup: {
			title: 'Welcome to Persona',
			subtitle: 'Sign up to get started'
		},
		titleStyle: 'text-xl md:text-3xl font-semibold tracking-tight',
		subtitleStyle: 'text-xl md:text-3xl font-light text-muted-foreground'
	};
</script>

<div class="flex h-screen w-full flex-col overflow-hidden lg:flex-row">
	<!-- Left side - Form -->
	<div
		class="flex w-full flex-1 flex-col items-center justify-between overflow-y-auto p-8 md:w-1/2"
	>
		<header class="mb-10 flex w-full max-w-lg items-start md:mb-20">
			<h1 class="text-2xl font-bold tracking-tight md:text-3xl">Persona</h1>
		</header>

		<div class="flex w-full max-w-lg flex-1 flex-col justify-center">
			{#if login}
				<div class="flex flex-col items-start">
					<div class={HEADER_TEXT.titleStyle}>{HEADER_TEXT.login.title}</div>
					<div class={HEADER_TEXT.subtitleStyle}>{HEADER_TEXT.login.subtitle}</div>
				</div>
			{:else}
				<div class="flex flex-col items-start">
					<div class={HEADER_TEXT.titleStyle}>{HEADER_TEXT.signup.title}</div>
					<div class={HEADER_TEXT.subtitleStyle}>{HEADER_TEXT.signup.subtitle}</div>
				</div>
			{/if}
			<div class="mt-10 flex flex-1 flex-col items-start justify-start gap-5 md:mt-20 md:gap-10">
				<Button
					variant="outline"
					class="w-full rounded-full border bg-white shadow-none md:py-6"
					onclick={async () => {
						await authClient.signIn.social({
							provider: 'google'
						});
					}}
				>
					<img src="/google.png" class="h-4 w-4" alt="googlelogo" />
					Continue with Google
				</Button>
				<div class="flex w-full items-center">
					<div class="h-px flex-1 bg-gray-200"></div>
					<div class="px-4 text-xs text-gray-500">or</div>
					<div class="h-px flex-1 bg-gray-200"></div>
				</div>
				<div class="w-full space-y-6">
					{@render children()}
				</div>
			</div>
		</div>
	</div>

	<!-- Right side - Image -->
	<div class="relative hidden p-2 md:w-1/2 lg:block lg:flex-1">
		<img src="/authImage.png" alt="Authentication" class="h-full w-full rounded-xl object-cover" />
	</div>
</div>
