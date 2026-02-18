import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import proyectoRoutes from './routes/proyectos.routes'
// import actividadRoutes from './routes/actividades.routes'
// import errorHandler from './middelewares/error.middleware';
const app = express();

app.use(helmet())

app.use(cors({
    origin:[
        'http://localhost:4000',
        'http://127.0.0.1:4000',
    ],
    methods:[
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ],
    credentials: true,
}))

app.use(express.json())

//rutas 
app.use('/api/proyectos', proyectoRoutes)
// app.use('/api/actividades', actividadRoutes)

// app.use(errorHandler)

export default app;