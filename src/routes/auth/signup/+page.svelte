<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { authClient } from '$lib/client';
	import { goto } from '$app/navigation';

	const LABEL_STYLE = 'text-xs font-light text-muted-foreground';
	const INPUT_STYLE = 'w-full border-none bg-white py-5 text-sm shadow-none';

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let password = $state('');
	let loading = $state(false);

	async function handleSignup() {
		loading = true;
		await authClient.signUp.email({
			email,
			password,
			name: `${firstName} ${lastName}`,
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
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="first-name" class={LABEL_STYLE}>First name</Label>
			<Input
				id="first-name"
				placeholder="Max"
				required
				class={INPUT_STYLE}
				bind:value={firstName}
			/>
		</div>
		<div class="space-y-2">
			<Label for="last-name" class={LABEL_STYLE}>Last name</Label>
			<Input
				id="last-name"
				placeholder="Robinson"
				required
				class={INPUT_STYLE}
				bind:value={lastName}
			/>
		</div>
	</div>

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
		<Label for="password" class={LABEL_STYLE}>Password</Label>
		<Input
			id="password"
			type="password"
			required
			class={INPUT_STYLE}
			bind:value={password}
		/>
	</div>

	<Button type="submit" class="w-full py-5" onclick={handleSignup} disabled={loading}>
		{loading ? 'Creating account...' : 'Create an account'}
	</Button>
</div>

<div class="text-center text-xs text-muted-foreground">
	Already have an account?{' '}
	<a href="/auth/login" class="text-primary underline underline-offset-4"> Login </a>
</div>
