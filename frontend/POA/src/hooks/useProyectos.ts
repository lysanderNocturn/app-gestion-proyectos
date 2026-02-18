import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = '/api';

interface Proyecto {
    id: number
    nombre: string
    descripcion?: string
    estadoActual: string
    fechaInicio: string
    fechaFin: string
    porcentajeCompletado: number
}

export const useProyectos = () => {
    return useQuery<Proyecto[]>({
        queryKey: ['proyectos'],
        queryFn: async () => {
            const { data } = await axios.get(`${API_URL}/proyectos`);
            return data;
        },
    })
}