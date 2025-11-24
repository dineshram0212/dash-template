import type { ComponentType } from 'svelte';
import { Home, Wand, Settings } from '@lucide/svelte';
import type { LucideType } from '@lucide/svelte';

export type SidebarSection = {
	title: string;
	url: string;
	icon?: LucideType;
};

export const SIDEBAR_SECTIONS: SidebarSection[] = [
	{
		title: 'Home',
		url: '/home',
		icon: Home as LucideType
	},
	{
		title: 'Generate',
		url: '/generate',
		icon: Wand as LucideType
	},
	{
		title: 'Settings',
		url: '/settings',
		icon: Settings as LucideType
	}
];
