import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProyectosProvider } from './context/ProyectosContext.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries:{
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProyectosProvider>
        <App />
      </ProyectosProvider>
      
    </QueryClientProvider>
  </React.StrictMode>
)
