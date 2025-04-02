// Details.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const typeColors = {
	normal: 'bg-gray-400 dark:bg-gray-500',
	fire: 'bg-red-500 dark:bg-red-600',
	water: 'bg-blue-500 dark:bg-blue-600',
	electric: 'bg-yellow-400 dark:bg-yellow-500',
	grass: 'bg-green-500 dark:bg-green-600',
	ice: 'bg-blue-200 dark:bg-blue-300',
	fighting: 'bg-red-700 dark:bg-red-800',
	poison: 'bg-purple-500 dark:bg-purple-600',
	ground: 'bg-yellow-600 dark:bg-yellow-700',
	flying: 'bg-indigo-300 dark:bg-indigo-400',
	psychic: 'bg-pink-500 dark:bg-pink-600',
	bug: 'bg-lime-500 dark:bg-lime-600',
	rock: 'bg-yellow-700 dark:bg-yellow-800',
	ghost: 'bg-purple-700 dark:bg-purple-800',
	dragon: 'bg-indigo-600 dark:bg-indigo-700',
	dark: 'bg-gray-800 dark:bg-gray-900',
	steel: 'bg-gray-500 dark:bg-gray-600',
	fairy: 'bg-pink-300 dark:bg-pink-400',
};

function Details() {
	const { name } = useParams();
	const [pokemon, setPokemon] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await axios.get(
					`https://pokeapi.co/api/v2/pokemon/${name}`,
				);
				setPokemon(response.data);
			} catch (err) {
				setError('Could not load Pokémon information. Please try again later.');
				console.error('Error fetching Pokemon:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchPokemon();
	}, [name]);

	if (loading)
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
			</div>
		);

	if (error)
		return (
			<div className="text-center py-10 font-body">
				<p className="text-red-500 dark:text-red-400">{error}</p>
				<Link
					to="/pokedex"
					className="text-blue-500 dark:text-blue-400 hover:underline"
				>
					Back to Pokédex
				</Link>
			</div>
		);

	if (!pokemon) return null;

	const primaryType = pokemon.types[0].type.name;
	const bgColorClass =
		typeColors[primaryType] || 'bg-gray-300 dark:bg-gray-400';

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 font-body">
			<header className="bg-red-600 dark:bg-red-800 text-white shadow-md transition-colors duration-200">
				<div className="container mx-auto px-4 py-4">
					<div className="flex justify-between items-center">
						<Link
							to="/pokedex"
							className="text-white hover:underline flex items-center transition-colors duration-200 font-body"
						>
							<FaArrowLeft className="mr-2" /> Back
						</Link>
						<h1 className="text-2xl font-bold font-pokemon">Pokédex</h1>
						<div className="w-6"></div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
					<div
						className={`${bgColorClass} p-6 text-white transition-colors duration-200`}
					>
						<div className="flex justify-between items-start">
							<div>
								<h2 className="text-3xl font-bold capitalize font-pokemon">
									{pokemon.name}
								</h2>
								<div className="flex gap-2 mt-2">
									{pokemon.types.map((type, index) => (
										<span
											key={index}
											className={`${
												typeColors[type.type.name] ||
												'bg-gray-300 dark:bg-gray-400'
											} px-3 py-1 rounded-full text-sm capitalize text-white font-body`}
										>
											{type.type.name}
										</span>
									))}
								</div>
							</div>
							<span className="text-xl font-bold font-body">
								#{pokemon.id.toString().padStart(3, '0')}
							</span>
						</div>
					</div>

					<div className="flex justify-center p-6">
						<img
							src={
								pokemon.sprites?.other?.['official-artwork']?.front_default ||
								pokemon.sprites?.front_default
							}
							alt={pokemon.name}
							className="h-64 w-64 object-contain transition-transform duration-200 hover:scale-110"
						/>
					</div>

					<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
						<div>
							<h3 className="text-xl font-bold mb-4 dark:text-white transition-colors duration-200 font-pokemon">
								Basic Information
							</h3>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
										Height
									</p>
									<p className="font-semibold dark:text-white transition-colors duration-200">
										{(pokemon.height / 10).toFixed(1)} m
									</p>
								</div>
								<div>
									<p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
										Weight
									</p>
									<p className="font-semibold dark:text-white transition-colors duration-200">
										{(pokemon.weight / 10).toFixed(1)} kg
									</p>
								</div>
								<div>
									<p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
										Base Experience
									</p>
									<p className="font-semibold dark:text-white transition-colors duration-200">
										{pokemon.base_experience}
									</p>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-xl font-bold mb-4 dark:text-white transition-colors duration-200 font-pokemon">
								Abilities
							</h3>
							<div className="space-y-2">
								{pokemon.abilities.map((ability, index) => (
									<div
										key={index}
										className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-200"
									>
										<p className="font-semibold capitalize dark:text-white transition-colors duration-200">
											{ability.ability.name.replace('-', ' ')}
										</p>
										{ability.is_hidden && (
											<span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">
												Hidden ability
											</span>
										)}
									</div>
								))}
							</div>
						</div>

						<div className="md:col-span-2">
							<h3 className="text-xl font-bold mb-4 dark:text-white transition-colors duration-200 font-pokemon">
								Stats
							</h3>
							<div className="space-y-3">
								{pokemon.stats.map((stat, index) => (
									<div key={index}>
										<div className="flex justify-between mb-1">
											<span className="capitalize dark:text-white transition-colors duration-200">
												{stat.stat.name.replace('-', ' ')}
											</span>
											<span className="font-semibold dark:text-white transition-colors duration-200">
												{stat.base_stat}
											</span>
										</div>
										<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 transition-colors duration-200">
											<div
												className={`h-2.5 rounded-full ${
													stat.base_stat > 70
														? 'bg-green-500'
														: stat.base_stat > 40
														? 'bg-yellow-500'
														: 'bg-red-500'
												} transition-colors duration-200`}
												style={{ width: `${Math.min(100, stat.base_stat)}%` }}
											></div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Details;
