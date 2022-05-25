import { ApolloProvider } from '@apollo/client';
import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'
import apolloClient from './services/apolloClientProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const theme: MantineThemeOverride = {
  fontFamily: 'Inter', 
  colors: {
    purple: ["#E0E0F5", "#CDCDEF", "#B9B9E8", "#A6A6E2", "#9292DB", "#7F7FD5", "#6C6CC6", "#5959B8", "#4545A9", "#32329A"]
  },
  primaryColor: 'purple'
}

root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </NotificationsProvider>
      </MantineProvider>
    </ApolloProvider>
  </React.StrictMode>
);