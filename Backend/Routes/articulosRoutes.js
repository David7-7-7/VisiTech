import { response, Router } from 'express';
import { ArticuloController } from '../controllers/ArticuloController.js';

export const Enrutador = (modelo) =>{  //Intanciamos el modelo (Articulo Controller), para importarlo mas adelante 

const controlador = new ArticuloController(modelo); // Creamos la instancia de Articulo Controller y lo mandamos al constructor

const articuloRouter = Router();

articuloRouter.get('/', controlador.getAll)

articuloRouter.get('/:id', controlador.getOneByID)

articuloRouter.delete('/:id', controlador.delete)

articuloRouter.post('/', controlador.create)

articuloRouter.put('/:id', controlador.update)

return articuloRouter;

}