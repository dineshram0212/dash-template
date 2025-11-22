export type SplashImage = {
	id: string;
	url: string;
	width: number;
	height: number;
	alt: string;
	author?: string;
	color?: string; // Dominant color for placeholder
};

export const MOCK_IMAGES: SplashImage[] = [
	{
		id: '1',
		url: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 1500, // Portrait
		alt: 'Photography of person holding camera',
		author: 'Ravi Patel',
		color: '#d4d4d4'
	},
	{
		id: '2',
		url: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 600, // Landscape
		alt: 'Random aesthetic objects',
		author: 'Sarah Jenkins',
		color: '#f5f5f5'
	},
	{
		id: '3',
		url: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 1000, // Square
		alt: 'Modern interior design',
		author: 'Design Co.',
		color: '#e0e0e0'
	},
	{
		id: '4',
		url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 1300, // Portrait
		alt: 'Portrait of a woman',
		author: 'Christopher Campbell',
		color: '#a8a8a8'
	},
	{
		id: '5',
		url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 1500,
		alt: 'Man looking at view',
		author: 'Joseph Gonzalez',
		color: '#333333'
	},
	{
		id: '6',
		url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 800,
		alt: 'Modern furniture',
		author: 'Furniture Inc',
		color: '#cccccc'
	},
	{
		id: '7',
		url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 1400,
		alt: 'Abstract fluid art',
		author: 'Artistic Soul',
		color: '#1a1a1a'
	},
	{
		id: '8',
		url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop',
		width: 1000,
		height: 750,
		alt: 'Working desk setup',
		author: 'Tech Guru',
		color: '#f0f0f0'
	}
];
