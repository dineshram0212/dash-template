import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		setTheme: (theme: Theme) => {
			set(theme);
			if (browser) {
				localStorage.setItem(THEME_KEY, theme);
				applyTheme(theme);
			}
		},
		initialize: () => {
			if (browser) {
				const stored = localStorage.getItem(THEME_KEY) as Theme;
				const initialTheme = stored || 'light';
				set(initialTheme);
				applyTheme(initialTheme);
			}
		}
	};
}

function applyTheme(theme: Theme) {
	if (!browser) return;

	const root = document.documentElement;
	const isDark = theme === 'dark';

	root.classList.toggle('dark', isDark);

	// Update meta theme-color for mobile browsers
	const metaThemeColor = document.querySelector('meta[name="theme-color"]');
	if (metaThemeColor) {
		metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
	}
}

export const theme = createThemeStore();
