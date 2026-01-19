import { usuarios } from "../datos/usuarios.js";
import bcrypt from 'bcrypt';
import {crearToken} from "../helpers/jwt_users.js";

let usuariosDevolver = usuarios;

export class Usuario{

    static register = async(usuarios) => {
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

        nuevoUsuario.password = await bcrypt.hash(nuevoUsuario.password, 10); // Contraseña codificada
        usuariosDevolver = [...usuariosDevolver, nuevoUsuario];

        return nuevoUsuario
    }

    static login = async(usuarios) => {
        let usuarioRecibido = usuarios;

        let usuarioRegistrado = usuariosDevolver.find((usuarios) => usuarios.nick == usuarioRecibido.nick);

        if(!usuarioRegistrado )
            return "No existe el usuario";

        let pwd = await bcrypt.compare(usuarioRecibido.password,usuarioRegistrado.password);

        if(!pwd)
            return "Fallo de autenticacion";

        const token = crearToken(usuarioRegistrado);

        const usuarioFormateado = {
            nick: usuarioRegistrado.nick,
            mail: usuarioRegistrado.mail,
            token: token
        }

        return usuarioFormateado;
    }
    

}