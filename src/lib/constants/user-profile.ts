import { User, Settings, LogOut } from '@lucide/svelte';

export const USER_PROFILE_MENU = [
	{
		label: 'Profile',
		icon: User,
		href: '/profile'
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings'
	}
];

export const LOGOUT_ITEM = {
	label: 'Log out',
	icon: LogOut
};
