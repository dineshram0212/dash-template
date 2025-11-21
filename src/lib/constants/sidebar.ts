import type { ComponentType } from 'svelte';
import { Home, Settings } from '@lucide/svelte';

export type SidebarSection = {
	title: string;
	url: string;
	icon?: ComponentType;
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
	{
		title: 'Home',
		url: '/',
		icon: Home
	},
	{
		title: 'Settings',
		url: '/settings',
		icon: Settings
	}
];
