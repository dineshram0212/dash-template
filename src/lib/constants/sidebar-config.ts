import type { ComponentType } from 'svelte';
import { SETTINGS_SECTIONS } from './settings';

export type SidebarItem = {
	title: string;
	url?: string;
	icon?: ComponentType;
	id?: string;
	onClick?: () => void;
};

export type SubSidebarConfig = {
	path: string;
	backUrl: string;
	backLabel?: string;
	items: SidebarItem[];
};

// Map existing settings sections to the new SidebarItem structure
const settingsItems: SidebarItem[] = SETTINGS_SECTIONS.map((section) => ({
	title: section.title,
	id: section.id,
	icon: section.icon,
	url: `/settings?section=${section.id}`
}));

export const SUB_SIDEBARS: SubSidebarConfig[] = [
	{
		path: '/settings',
		backUrl: '/home',
		backLabel: 'Back',
		items: settingsItems
	}
];
