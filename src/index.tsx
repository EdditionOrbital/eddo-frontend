import { ApolloProvider } from '@apollo/client';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'
import apolloClient from './services/apolloClientProvider';
import theme from './services/theme';
import UserContextProvider from './services/userContextProvider';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<ApolloProvider client={apolloClient}>
			<UserContextProvider>
				<MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
					<NotificationsProvider>
						<ModalsProvider>
							<BrowserRouter>
								<App/>
							</BrowserRouter>
						</ModalsProvider>
					</NotificationsProvider>
				</MantineProvider>
			</UserContextProvider>
		</ApolloProvider>
	</React.StrictMode>
);