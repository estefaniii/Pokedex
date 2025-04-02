import { createContext, useContext, useReducer } from 'react';

const NameContext = createContext();

const initialState = {
	name: localStorage.getItem('pokemonTrainerName') || '',
};

function nameReducer(state, action) {
	switch (action.type) {
		case 'SET_NAME':
			localStorage.setItem('pokemonTrainerName', action.payload);
			return { ...state, name: action.payload };
		case 'CLEAR_NAME':
			localStorage.removeItem('pokemonTrainerName');
			return { ...state, name: '' };
		default:
			return state;
	}
}

export const NameProvider = ({ children }) => {
	const [state, dispatch] = useReducer(nameReducer, initialState);

	return (
		<NameContext.Provider value={{ state, dispatch }}>
			{children}
		</NameContext.Provider>
	);
};

export const useName = () => {
	const context = useContext(NameContext);
	if (!context) {
		throw new Error('useName must be used within a NameProvider');
	}
	return context;
};
