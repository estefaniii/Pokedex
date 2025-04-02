import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PokemonsList from './components/PokemonsList';
import { useName } from '../../context/NameContext';
import { useTheme } from '../../context/ThemeContext';
import {
	FiSearch,
	FiX,
	FiChevronLeft,
	FiChevronRight,
	FiChevronsLeft,
	FiChevronsRight,
} from 'react-icons/fi';
import Header from '../../components/Header';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon?limit=151';
const TYPE_API = 'https://pokeapi.co/api/v2/type';

function Pokedex() {
	const { state: nameState } = useName();
	const { pokemonsPerPage, setPokemonsPerPage } = useTheme(); // You're already using pokemonsPerPage from context
	const [pokemons, setPokemons] = useState([]);
	const [filteredPokemons, setFilteredPokemons] = useState([]);
	const [types, setTypes] = useState([]);
	const [search, setSearch] = useState('');
	const [selectedType, setSelectedType] = useState('all');
	const [isLoading, setIsLoading] = useState(true);
	const [suggestions, setSuggestions] = useState([]);
	const [showSuggestions, setShowSuggestions] = useState(false);
	const searchRef = useRef(null);
	const timeoutRef = useRef(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				setError(null);
				const [pokemonRes, typesRes] = await Promise.all([
					axios.get(POKEMON_API),
					axios.get(TYPE_API),
				]);

				const pokemonData = await Promise.all(
					pokemonRes.data.results.map((p) =>
						axios.get(p.url).then((res) => ({
							...res.data,
							name: res.data.name,
							types: res.data.types.map((t) => t.type.name),
							id: res.data.id,
							sprites: res.data.sprites,
							stats: res.data.stats,
						})),
					),
				);

				setPokemons(pokemonData);
				setFilteredPokemons(pokemonData);
				setTypes(typesRes.data.results);
			} catch (err) {
				setError('Failed to load Pokémon data.');
				console.error('Error fetching data:', err);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			filterPokemons();
		}, 300);

		return () => clearTimeout(timeoutRef.current);
	}, [search, selectedType]);

	const filterPokemons = () => {
		let results = [...pokemons];

		if (selectedType !== 'all') {
			results = results.filter((pokemon) =>
				pokemon.types.includes(selectedType),
			);
		}

		if (search) {
			results = results.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(search.toLowerCase()),
			);

			const searchTerm = search.toLowerCase();
			const sug = pokemons
				.filter((p) => p.name.toLowerCase().includes(searchTerm))
				.slice(0, 5);
			setSuggestions(sug);
		} else {
			setSuggestions([]);
		}

		setFilteredPokemons(results);
		setCurrentPage(1);
	};

	const handleSuggestionClick = (name) => {
		setSearch(name);
		setShowSuggestions(false);
		filterPokemons();
	};

	const clearSearch = () => {
		setSearch('');
		setSuggestions([]);
		filterPokemons();
		searchRef.current.focus();
	};

	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = filteredPokemons.slice(
		indexOfFirstPokemon,
		indexOfLastPokemon,
	);
	const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);

	const goToFirstPage = () => setCurrentPage(1);
	const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
	const goToNextPage = () =>
		setCurrentPage(Math.min(totalPages, currentPage + 1));
	const goToLastPage = () => setCurrentPage(totalPages);

	return (
		<div className="min-h-screen bg-[rgb(var(--color-bg))] text-[rgb(var(--color-text))] font-body">
			<Header
				title={<div className="text-4xl font-pokemon">Pokédex</div>}
				subtitle={`Welcome, ${nameState.name}`}
			/>
			{/* ... rest of your Pokedex component */}
			<div className="container mx-auto px-4 py-8">
				<div className="mb-8 bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700">
					<div className="flex flex-col md:flex-row gap-4 mb-6">
						<div className="relative flex-1">
							<div className="relative">
								<FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
								<input
									ref={searchRef}
									type="text"
									placeholder="Search Pokémon..."
									value={search}
									onChange={(e) => {
										setSearch(e.target.value);
										setShowSuggestions(true);
									}}
									onFocus={() => setShowSuggestions(true)}
									className="w-full pl-10 pr-10 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white placeholder-gray-400 font-body"
									id="search-pokemon" // Added id
								/>
								{search && (
									<button
										onClick={clearSearch}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
									>
										<FiX />
									</button>
								)}
							</div>

							{showSuggestions && suggestions.length > 0 && (
								<div className="absolute z-20 mt-1 w-full bg-gray-700 rounded-lg shadow-lg border border-gray-600">
									{suggestions.map((pokemon) => (
										<div
											key={pokemon.name}
											onClick={() => handleSuggestionClick(pokemon.name)}
											className="px-4 py-2 hover:bg-gray-600 cursor-pointer capitalize flex items-center"
										>
											<img
												src={pokemon.sprites?.front_default}
												alt={pokemon.name}
												className="w-8 h-8 mr-2"
											/>
											{pokemon.name}
										</div>
									))}
								</div>
							)}
						</div>

						<select
							value={selectedType}
							onChange={(e) => setSelectedType(e.target.value)}
							className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-white capitalize font-body"
							id="filter-type" // Added id
						>
							<option value="all">All Types</option>
							{types.map((type) => (
								<option key={type.name} value={type.name}>
									{type.name}
								</option>
							))}
						</select>
					</div>
				</div>

				{error && (
					<div
						className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
						role="alert"
					>
						<strong className="font-bold">Error!</strong>
						<span className="block sm:inline">{error}</span>
					</div>
				)}

				{isLoading ? (
					<div className="flex justify-center py-20">
						<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
					</div>
				) : (
					<>
						<PokemonsList pokemons={currentPokemons} />

						{filteredPokemons.length > 0 && totalPages > 1 && (
							<div className="flex justify-center mt-8">
								<nav className="inline-flex items-center rounded-md shadow font-body">
									<button
										onClick={goToFirstPage}
										disabled={currentPage === 1}
										className="px-2 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-l-md hover:bg-gray-700 disabled:opacity-50"
									>
										<FiChevronsLeft className="h-5 w-5" />
									</button>
									<button
										onClick={goToPreviousPage}
										disabled={currentPage === 1}
										className="px-2 py-2 bg-gray-800 text-gray-300 border-t border-b border-gray-700 hover:bg-gray-700 disabled:opacity-50"
									>
										<FiChevronLeft className="h-5 w-5" />
									</button>
									<span className="px-4 py-2 bg-gray-700 text-white border-t border-b border-gray-700">
										{currentPage} / {totalPages}
									</span>
									<button
										onClick={goToNextPage}
										disabled={currentPage === totalPages}
										className="px-2 py-2 bg-gray-800 text-gray-300 border-t border-b border-gray-700 hover:bg-gray-700 disabled:opacity-50"
									>
										<FiChevronRight className="h-5 w-5" />
									</button>
									<button
										onClick={goToLastPage}
										disabled={currentPage === totalPages}
										className="px-2 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-r-md hover:bg-gray-700 disabled:opacity-50"
									>
										<FiChevronsRight className="h-5 w-5" />
									</button>
								</nav>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Pokedex;
