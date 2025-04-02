import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [
		react(),
		tailwindcss({
			config: {
				content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
				theme: {
					extend: {
						colors: {},
					},
					fontFamily: {
						pokemon: ['VT323', 'monospace'],
						body: ['"Segoe UI"', 'Roboto', 'sans-serif'],
					},
				},
				plugins: [],
			},
		}),
	],
});
