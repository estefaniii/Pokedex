import NameForm from './components/NameForm';
import PikachuAnimation from '../../components/PikachuAnimation';

function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
			{/* Elementos decorativos */}
			<div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
				<div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-red-500 filter blur-3xl"></div>
				<div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-blue-500 filter blur-3xl"></div>
			</div>

			<div className="relative z-10 text-center max-w-md w-full">
				<div className="mb-8 animate-bounce">
					<h1 className="text-5xl mb-2">POKÉDEX</h1>
					<h2 className="text-xl text-yellow-400 mb-6">Hello Trainer!</h2>
				</div>

				<div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
					<p className="text-gray-300 mb-6 text-lg">
						To begin your Pokémon journey, tell us your name
					</p>
					<NameForm />
				</div>

				<div className="mt-8">
					<PikachuAnimation />
				</div>
			</div>

			<footer className="mt-12 text-gray-500 text-sm">
				© {new Date().getFullYear()} Pokédex App
			</footer>
		</div>
	);
}

export default Home;
