import React from 'react';
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App';

import { FilterProvider } from './context/filter_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux'
import { store } from './store'

const root = document.getElementById('root');
createRoot(root).render(<React.StrictMode>
	<Provider store={store}>
		<Auth0Provider
			domain="dev-8iki6kghscspsoko.us.auth0.com"
			clientId="o5FaTR88Sw4YF69cBKX2KmsvWbMtA1i9"
			redirectUri={window.location.origin}
			cacheLocation='localstorage'>
			<UserProvider>
				<FilterProvider>
					<App />
				</FilterProvider>
			</UserProvider>
		</Auth0Provider>
	</Provider>
</React.StrictMode>);
