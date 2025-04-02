export default function PikachuAnimation() {
	return (
		<div className="relative w-24 h-24 mx-auto">
			<div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-20"></div>
			<div className="absolute inset-2 bg-yellow-400 rounded-full flex items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className="h-12 w-12 text-gray-900"
					fill="currentColor"
				>
					<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
					<circle cx="8.5" cy="10.5" r="1.5" />
					<circle cx="15.5" cy="10.5" r="1.5" />
					<path d="M12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
				</svg>
			</div>
			<div className="absolute -bottom-2 left-0 right-0 h-2 bg-yellow-400 rounded-full blur-sm"></div>
		</div>
	);
}
