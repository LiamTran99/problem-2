import React from 'react';
import ReactDOM from 'react-dom/client';
import CurrencySwapForm from './components/CurrencySwapForm';
import './index.css';
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react"
import {QueryProvider} from "./providers/ReactQuery";

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: `'Inter', sans-serif` },
                body: { value: `'Inter', sans-serif` },
            },
        },
    },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <QueryProvider>
          <ChakraProvider value={system}>
              <CurrencySwapForm />
          </ChakraProvider>
      </QueryProvider>
  </React.StrictMode>
);
