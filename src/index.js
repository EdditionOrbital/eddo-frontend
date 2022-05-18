import { ApolloProvider } from '@apollo/client';
import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import apolloClient from './services/apolloClientProvider';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <ColorModeScript />
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);