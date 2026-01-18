import { Articulo } from '../models/Articulo.js';
import { validarArticulo,validarParcial } from '../helpers/zod.js';

export class ArticuloController{
    static async getAll(request,response){
        response.json(await Articulo.getAll());
    }

    static async getOneBiID(request,response){
        const id= Number(request.params.id);

        const articulo = await Articulo.getOneBiID(id);

        if(articulo){
            response.json(articulo);
        } else{
            response.status(400).end();
        }
    }

    static async delete(request, response){
        const id= Number(request.params.id);
        const articulosDevolver = await Articulo.delete(id);

        if(articulosDevolver){
            response.json(articulosDevolver);
        }else{
            response.status(400).end();
        }
    }

    static async create(request,response){
        const articulo = validarArticulo(request.body);

        if (articulo.error){
            return response.status(400).json('Validación incorrecta')
        }

        const nuevoArticulo = await Articulo.create(articulo);

        response.json(nuevoArticulo); //solo se muestra el nuevo dato
        //response.json(articulosDevolver);
    }

    static async update(request,response){
        const id= Number(request.params.id);
        const articuloValidado = validarParcial(request.body);

        const nuevoArticulo =await  Articulo.update(id,articuloValidado);

        response.json(nuevoArticulo);
    }
}