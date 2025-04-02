export default function Header({ title, subtitle }) {
	return (
		<header className="bg-gradient-to-r from-gray-900 to-gray-800 py-6 shadow-lg border-b border-gray-800">
			<div className="container mx-auto px-4">
				<div className="flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold text-yellow-400">{title}</h1>
						{subtitle && <p className="text-gray-400 mt-1">{subtitle}</p>}
					</div>
					<div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
						<span className="text-white font-bold text-xl">P</span>
					</div>
				</div>
			</div>
		</header>
	);
}
