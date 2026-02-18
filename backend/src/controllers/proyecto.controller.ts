import type { Request, Response } from 'express'
import { describe } from 'zod/v4/core'
import { id } from 'zod/v4/locales'

// Datos mock (simulan tu tabla proyectos)
const proyectos: any[] = [
  {
    id: 1,
    nombre: 'Implementación Sistema de Gestión',
    descripcion: 'Modernizar procesos administrativos',
    estadoActual: 'En progreso',
    fechaInicio: '2025-01-15',
    fechaFin: '2025-12-31',
    porcentajeCompletado: 50,
  },
  {
    id: 2,
    nombre: 'Capacitación Personal 2026',
    descripcion: 'Entrenamiento en nuevas herramientas',
    estadoActual: 'Planificado',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-06-30',
    porcentajeCompletado: 35,
  },
  {
    id: 3,
    nombre: 'Optimización Infraestructura TI',
    descripcion: 'Actualizar servidores y redes',
    estadoActual: 'En progreso',
    fechaInicio: '2026-05-01',
    fechaFin: '2026-10-31',
    porcentajeCompletado: 85,
  
  },
  {
    id: 4,
    nombre: 'Capacitacion personal RRHH',
    descripcion: 'Capacitación en nuevas herramientas',
    estadoActual: 'Iniciado',
    fechaInicio: '2026-03-01',
    fechaFin: '2026-06-30',
    porcentajeCompletado: 20,
  },
  {
    id: 5,
    nombre: 'Desarrollo de nueva plataforma web',
    descripcion: 'Crear una plataforma moderna para clientes',
    estadoActual: 'En progreso',
    fechaInicio: '2026-01-01',
    fechaFin: '2026-12-31',
    porcentajeCompletado: 60,
  },
  {
    id: 6,
    nombre: 'Conferencia de mejora ciudadana',
    descripcion: 'Organizar evento para promover la participación ciudadana',
    estadoActual: 'En progreso',
    fechaInicio: '2026-04-01',
    fechaFin: '2026-09-30',
    porcentajeCompletado: 40,
  }
]

export const getProyectos = (req: Request, res: Response) => {
  res.json(proyectos)
}

export const getProyectoById = (req: Request<{ id: string}>, res: Response) => {
  const id = parseInt(req.params.id)
  const proyecto = proyectos.find(p => p.id === id)
  if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' })
  res.json(proyecto)
}

export const createProyecto = (req: Request, res: Response) => {
  const nuevoProyecto = {
    id: proyectos.length + 1,
    ...req.body,
    porcentajeCompletado: req.body.porcentajeCompletado || 0,
  }
  proyectos.push(nuevoProyecto)
  res.status(201).json(nuevoProyecto)
}