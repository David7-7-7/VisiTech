import { usuarios } from "../datos/usuarios.js";

let usuariosDevolver = usuarios;

export class Usuario{

    static register = (usuarios) => {
        if(!usuarios.success){
            return Error;
        }

        const nuevoUsuario ={
            ...usuarios.data
        }
        
        if(usuariosDevolver.find(usuario => usuario.nick === nuevoUsuario.nick) || 
        usuariosDevolver.find(usuario => usuario.mail === nuevoUsuario.mail))
        {
            return "Usuario duplicado"
        }

        usuariosDevolver = [...usuariosDevolver, nuevoUsuario];

        return nuevoUsuario
    }

}