import { createContext, useContext, useState, type ReactNode } from 'react'

interface Proyecto {
    id: number
    nombre: string
    descripcion?: string
    estadoActual: string
    fechaInicio: string
    fechaFin: string
    porcentajeCompletado: number
}

interface ProyectosContextType {
    proyectos: Proyecto[]
    agregarProyecto: (proyecto: Omit<Proyecto, 'id'>) => void
    editarProyecto: (id: number, proyecto: Partial<Proyecto>) => void
    eliminarProyecto: (id: number) => void
}

const ProyectoContext = createContext<ProyectosContextType | undefined>(undefined)

export function ProyectosProvider({ children }: { children: ReactNode }) {
    const [proyectos, setProyectos] = useState<Proyecto[]>([
        { id: 1, nombre: 'Implementación ERP', descripcion: 'Integración de sistema ERP para gestión empresarial', estadoActual: 'En progreso', fechaInicio: '2026-01-01', fechaFin: '2026-12-31', porcentajeCompletado: 68.5 },
        { id: 2, nombre: 'Capacitación en nuevas tecnologías', descripcion: 'Formación del personal en herramientas modernas', estadoActual: 'Planificado', fechaInicio: '2026-03-01', fechaFin: '2026-06-30', porcentajeCompletado: 35 },
        { id: 3, nombre: 'Optimización de infraestructura TI', descripcion: 'Actualización de servidores y redes para mejorar rendimiento', estadoActual: 'En progreso', fechaInicio: '2026-05-01', fechaFin: '2026-10-31', porcentajeCompletado: 85 },
    ])

    const agregarProyecto = (nuevo: Omit <Proyecto, 'id'>) => {
        setProyectos(prev => [...prev, { id: prev.length + 1 + Date.now(), ...nuevo }])
    }
    
    const editarProyecto = (id: number, updates: Partial<Proyecto>) => {
        setProyectos(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
    }

    const eliminarProyecto = (id: number) => {
        setProyectos(prev => prev.filter(p => p.id !== id))
    }

    return(
        <ProyectoContext.Provider value={{ proyectos, agregarProyecto, editarProyecto, eliminarProyecto }}> 
            {children}
        </ProyectoContext.Provider>
    )
}

export const useProyectosContext = () => { 
    const context = useContext(ProyectoContext)
    if (!context) throw new Error('useProyectosContext debe usarse dentro de un ProyectosProvider')
    return context
}
