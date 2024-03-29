import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App.tsx'
import { AppProvider } from './presentation/context/random/AppProvider.tsx';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
      <App />
    </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
