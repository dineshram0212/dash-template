import type { ComponentType } from 'svelte';
import { Settings, User, Bell, Shield } from '@lucide/svelte';

export type SettingsSection = {
	id: string;
	title: string;
	description: string;
	icon: ComponentType;
};

export const SETTINGS_SECTIONS: SettingsSection[] = [
	{
		id: 'general',
		title: 'General',
		description: 'Manage your general account settings',
		icon: Settings as unknown as ComponentType
	},
	{
		id: 'profile',
		title: 'Profile',
		description: 'Update your profile information',
		icon: User as unknown as ComponentType
	},
	{
		id: 'notifications',
		title: 'Notifications',
		description: 'Configure your notification preferences',
		icon: Bell as unknown as ComponentType
	},
	{
		id: 'security',
		title: 'Security',
		description: 'Manage your security settings',
		icon: Shield as unknown as ComponentType
	}
];
