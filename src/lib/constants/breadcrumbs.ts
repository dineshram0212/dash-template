export type BreadcrumbItem = {
	label: string;
	href?: string;
	icon?: any; // Lucide icon component
};

export type PageBreadcrumb = {
	title: string;
	items: BreadcrumbItem[];
};

// Breadcrumb configurations for each page
export const BREADCRUMBS: Record<string, PageBreadcrumb> = {
	'/home': {
		title: 'Home',
		items: [
			{ label: 'Home' }
		]
	},
	'/generate': {
		title: 'Generate',
		items: [
			{ label: 'Generate' }
		]
	},
	'/gallery': {
		title: 'Gallery',
		items: [
			{ label: 'Gallery' }
		]
	},
	'/settings': {
		title: 'General',
		items: [
			{ label: 'Settings', href: '/settings?section=general' },
			{ label: 'General' }
		]
	},
	// Settings subsections using query parameters
	'/settings?section=general': {
		title: 'General',
		items: [
			{ label: 'Settings', href: '/settings?section=general' },
			{ label: 'General' }
		]
	},
	'/settings?section=profile': {
		title: 'Profile',
		items: [
			{ label: 'Settings', href: '/settings?section=general' },
			{ label: 'Profile' }
		]
	},
	'/settings?section=security': {
		title: 'Security',
		items: [
			{ label: 'Settings', href: '/settings?section=general' },
			{ label: 'Security' }
		]
	},
	'/settings?section=notifications': {
		title: 'Notifications',
		items: [
			{ label: 'Settings', href: '/settings?section=general' },
			{ label: 'Notifications' }
		]
	},
	'/settings?section=preferences': {
		title: 'Preferences',
		items: [
			{ label: 'Settings', href: '/settings?section=general' },
			{ label: 'Preferences' }
		]
	}
};
