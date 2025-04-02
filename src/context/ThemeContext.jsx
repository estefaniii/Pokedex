import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [pokemonsPerPage, setPokemonsPerPage] = useState(() => {
		const savedPerPage = localStorage.getItem('pokemonsPerPage');
		return savedPerPage ? parseInt(savedPerPage) : 10;
	});

	useEffect(() => {
		localStorage.setItem('pokemonsPerPage', pokemonsPerPage);
	}, [pokemonsPerPage]);

	return (
		<ThemeContext.Provider
			value={{
				pokemonsPerPage,
				setPokemonsPerPage,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
