import jwt from 'jwt-simple';
import 'dotenv/config';

const caducidad= 1000 * 30;
 export const crearToken =(usuarios) =>{

    const payload={
        id: usuarios.id,
        nick: usuarios.nick,
        mail: usuarios.mail,
        exp: Date.now()+ caducidad
    }
    return jwt.encode(payload, process.env.SECRETO);
 }