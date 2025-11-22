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
		url: '/home',
		icon: Home as unknown as ComponentType
	},
	{
		title: 'Settings',
		url: '/settings',
		icon: Settings as unknown as ComponentType
	}
];
