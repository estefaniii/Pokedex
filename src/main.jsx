import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './routes/App';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { NameProvider } from './context/NameContext';
import './types.css';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<HashRouter>
			<ThemeProvider>
				<NameProvider>
					<App />
				</NameProvider>
			</ThemeProvider>
		</HashRouter>
	</StrictMode>,
);
