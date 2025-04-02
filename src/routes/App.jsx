import { Routes, Route } from 'react-router-dom';
import Home from '../app/home/Home';
import Pokedex from '../app/pokedex/Pokedex';
import Protected from './Protected';
import Details from '../app/details/Details';
import MainLayout from '../layout/MainLayout';
import '../index.css';

function App() {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 transition-colors duration-200">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route element={<MainLayout />}>
					<Route element={<Protected />}>
						<Route path="pokedex" element={<Pokedex />} />
						<Route path="pokedex/:name" element={<Details />} />
					</Route>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
