import { Router } from "express";
import { getProyectos, createProyecto, getProyectoById } from "../controllers/proyecto.controller";

const router = Router();

router.get('/', getProyectos);
router.post('/', createProyecto);
router.get('/:id', getProyectoById);

export default router;