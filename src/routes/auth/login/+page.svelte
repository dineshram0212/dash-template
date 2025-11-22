<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { authClient } from '$lib/client';
	import { goto } from '$app/navigation';

	const LABEL_STYLE = 'text-xs font-light text-muted-foreground';
	const INPUT_STYLE = 'w-full border-none bg-white py-5 text-sm shadow-none';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);

	async function handleLogin() {
		loading = true;
		await authClient.signIn.email({
			email,
			password,
			fetchOptions: {
				onSuccess: () => {
					loading = false;
					goto('/home');
				},
				onError: (ctx) => {
					loading = false;
					alert(ctx.error.message);
				}
			}
		});
	}
</script>

<!-- Left side - Form -->
<div class="space-y-4">
	<div class="space-y-2">
		<Label for="email" class={LABEL_STYLE}>Email</Label>
		<Input
			id="email"
			type="email"
			placeholder="m@example.com"
			required
			class={INPUT_STYLE}
			bind:value={email}
		/>
	</div>

	<div class="space-y-2">
		<div class="flex items-center justify-between">
			<Label for="password" class={LABEL_STYLE}>Password</Label>
			<a
				href="/forgot-password"
				class="text-xs text-muted-foreground underline-offset-4 hover:underline"
			>
				Forgot password?
			</a>
		</div>
		<Input id="password" type="password" required class={INPUT_STYLE} bind:value={password} />
	</div>

	<Button type="submit" class="w-full py-5" onclick={handleLogin} disabled={loading}>
		{loading ? 'Logging in...' : 'Login'}
	</Button>
</div>

<div class="text-center text-xs text-muted-foreground">
	Don't have an account?{' '}
	<a href="/auth/signup" class="text-primary underline underline-offset-4"> Sign up </a>
</div>
