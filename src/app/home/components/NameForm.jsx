import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useName } from '../../../context/NameContext';

function NameForm() {
	const { dispatch } = useName();
	const navigate = useNavigate();
	const inputRef = useRef();
	const [error, setError] = useState('');

	const handleSubmit = () => {
		const name = inputRef.current.value.trim();

		if (!name) {
			setError('Please enter your name');
			inputRef.current.focus();
			return;
		}

		if (name.length < 3) {
			setError('Name must be at least 3 characters');
			inputRef.current.focus();
			return;
		}

		dispatch({
			type: 'SET_NAME',
			payload: name,
		});
		navigate('/pokedex');
	};

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="trainerNameInput"
					className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 text-left transition-colors duration-200"
				>
					Your name
				</label>
				<input
					id="trainerNameInput"
					type="text"
					ref={inputRef}
					placeholder="Ex: Ash Ketchum"
					onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors duration-200"
				/>
				{error && (
					<p className="mt-1 text-sm text-red-600 dark:text-red-400 transition-colors duration-200">
						{error}
					</p>
				)}
			</div>

			<button
				onClick={handleSubmit}
				className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200"
			>
				Start Adventure
			</button>
		</div>
	);
}

export default NameForm;
