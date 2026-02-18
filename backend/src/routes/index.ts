import { Router } from "express";

const router = Router();

router.get('/', (req, res) =>
{
    res.json({
        message: 'ruta principal'
    });
});

router.get('/mapa', (req, res) =>
{
    res.send({
        mesage: 'El mapa del argis'
    });
});

export default router;