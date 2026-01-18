import { response, Router } from 'express';
import { ArticuloController } from '../controllers/ArticuloController.js';

export const articuloRouter = Router();

articuloRouter.get('/',ArticuloController.getAll)

articuloRouter.get('/:id',ArticuloController.getOneBiID)

articuloRouter.delete('/:id',ArticuloController.delete)

articuloRouter.post('/',ArticuloController.create)

articuloRouter.put('/:id',ArticuloController.update)