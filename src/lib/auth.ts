import { betterAuth } from 'better-auth';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';
import Database from 'better-sqlite3';

export const auth = betterAuth({
	database: new Database('sqlite.db'),
	plugins: [sveltekitCookies(getRequestEvent)],
	emailAndPassword: {
		enabled: true
	},
	providers: {
		google: {
			clientId: 'YOUR_GOOGLE_CLIENT_ID',
			clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET'
		}
	}
});
