import { validarUsuario } from "../helpers/zodUsers.js";

export class UsuarioController{

    constructor(modelo){
        this.modelo=modelo;
    }

    register = async(request, response) =>{
        const usuario = validarUsuario(request.body);

        const nuevoUsuario = await this.modelo.register(usuario);

        if(nuevoUsuario ==  Error){
            return response.status(400).json('Error de validacion');
        }

        response.json(nuevoUsuario);
    }
}