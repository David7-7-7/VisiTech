import { usuarios } from "../datos/usuarios.js";
import bcrypt from 'bcrypt';

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

        let pwd = usuarioRecibido.password.localeCompare(usuarioRegistrado.password);

        if(pwd !=0)
            return "Fallo de autenticacion";

        const usuarioFormateado = {
            nick: usuarioRegistrado.nick,
            mail: usuarioRegistrado.mail,
            token: "token"
        }

        return usuarioFormateado;
    }
    

}