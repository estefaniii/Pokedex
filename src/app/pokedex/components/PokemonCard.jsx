import { Link } from 'react-router-dom';

const typeColors = {
	normal: 'bg-gray-500',
	fire: 'bg-gradient-to-br from-red-500 to-orange-500',
	water: 'bg-gradient-to-br from-blue-500 to-blue-700',
	electric: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
	grass: 'bg-gradient-to-br from-green-500 to-green-700',
	ice: 'bg-gradient-to-br from-blue-200 to-blue-400',
	fighting: 'bg-gradient-to-br from-red-700 to-red-900',
	poison: 'bg-gradient-to-br from-purple-500 to-purple-700',
	ground: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
	flying: 'bg-gradient-to-br from-indigo-300 to-indigo-500',
	psychic: 'bg-gradient-to-br from-pink-500 to-pink-700',
	bug: 'bg-gradient-to-br from-lime-500 to-lime-700',
	rock: 'bg-gradient-to-br from-yellow-700 to-yellow-900',
	ghost: 'bg-gradient-to-br from-purple-700 to-purple-900',
	dragon: 'bg-gradient-to-br from-indigo-600 to-indigo-800',
	dark: 'bg-gradient-to-br from-gray-900 to-gray-800',
	steel: 'bg-gradient-to-br from-gray-500 to-gray-700',
	fairy: 'bg-gradient-to-br from-pink-300 to-pink-500',
};

const typeBorderColors = {
	normal: 'border-gray-500',
	fire: 'border-red-500',
	water: 'border-blue-500',
	electric: 'border-yellow-400',
	grass: 'border-green-500',
	ice: 'border-blue-200',
	fighting: 'border-red-700',
	poison: 'border-purple-500',
	ground: 'border-yellow-600',
	flying: 'border-indigo-300',
	psychic: 'border-pink-500',
	bug: 'border-lime-500',
	rock: 'border-yellow-700',
	ghost: 'border-purple-700',
	dragon: 'border-indigo-600',
	dark: 'border-gray-900',
	steel: 'border-gray-500',
	fairy: 'border-pink-300',
};

function PokemonCard({ pokemon }) {
	if (!pokemon) return null;

	const primaryType = pokemon.types[0];
	const cardBg = typeColors[primaryType] || 'bg-gray-800';
	const cardBorder = typeBorderColors[primaryType] || 'border-gray-700';

	return (
		<Link
			to={`/pokedex/${pokemon.name}`}
			className={`pokemon-card h-full border-4 ${cardBorder} hover:shadow-lg hover:transform hover:scale-105 transition-all duration-300`}
		>
			<div className={`absolute inset-0 ${cardBg} opacity-90 rounded-xl`}></div>

			<div className="relative z-10 h-full flex flex-col p-4">
				<div className="flex justify-between items-start">
					<span className="text-white font-bold text-sm bg-black bg-opacity-40 px-2 py-1 rounded">
						#{pokemon.id.toString().padStart(3, '0')}
					</span>
					<div className="flex gap-1">
						{pokemon.types.map((type, index) => (
							<span
								key={index}
								className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${typeColors[type]} text-white`}
							>
								{type}
							</span>
						))}
					</div>
				</div>

				<div className="flex-1 flex items-center justify-center p-4">
					<img
						src={
							pokemon.sprites?.other?.['official-artwork']?.front_default ||
							pokemon.sprites?.front_default
						}
						alt={pokemon.name}
						className="h-40 w-40 object-contain drop-shadow-lg hover:scale-110 transition-transform"
						onError={(e) => {
							e.target.src = '/placeholder-pokemon.png';
						}}
					/>
				</div>

				<div className="text-center">
					<h3 className="text-xl font-bold text-white capitalize mb-2">
						{pokemon.name}
					</h3>
					<div className="grid grid-cols-3 gap-2">
						{pokemon.stats.slice(0, 3).map((stat, index) => (
							<div key={index} className="bg-black bg-opacity-30 rounded p-1">
								<div className="text-xs text-gray-300 uppercase">
									{stat.stat.name.replace('-', ' ')}
								</div>
								<div className="font-bold text-white">{stat.base_stat}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Link>
	);
}

export default PokemonCard;
