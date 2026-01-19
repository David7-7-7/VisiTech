import { response, Router } from 'express';
import { ArticuloController } from '../controllers/ArticuloController.js';

export const Enrutador = (modelo) =>{  //Intanciamos el modelo (Articulo Controller), para importarlo mas adelante 

const controlador = new ArticuloController(modelo); // Creamos la instancia de Articulo Controller y lo mandamos al constructor

const articuloRouter = Router();

articuloRouter.get('/',ArticuloController.getAll)

articuloRouter.get('/:id',ArticuloController.getOneBiID)

articuloRouter.delete('/:id',ArticuloController.delete)

articuloRouter.post('/',ArticuloController.create)

articuloRouter.put('/:id',ArticuloController.update)

return articuloRouter;

}