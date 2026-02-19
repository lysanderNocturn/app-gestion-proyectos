import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Actividades from './pages/Actividades.tsx'
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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/actividades" element={<Actividades />} />
        </Routes>
      </BrowserRouter>      
    </QueryClientProvider>
  </React.StrictMode>
)
