import PokemonCard from './PokemonCard';

function PokemonsList({ pokemons }) {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
			{pokemons.length > 0 ? (
				pokemons.map((pokemon) => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))
			) : (
				<div className="col-span-full text-center py-12">
					<div className="text-gray-400 text-lg">
						No Pokémon found matching your search
					</div>
				</div>
			)}
		</div>
	);
}

export default PokemonsList;
