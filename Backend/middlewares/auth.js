import jwt from "jwt-simple";
import 'dotenv/config';

export const auth = (request,response, next) => {

    const tokenRecibido = request.headers.authorization ;

    if(!tokenRecibido)
        return response.status(403).json("Error de autenticacion 3 "+ tokenRecibido);

    const token = tokenRecibido.replace(/['"]+/g,''); //Reemplazamos los caracteres por caracteres vacios

    let payload;

    try{
        payload = jwt.decode(token, process.env.SECRETO);

        if(payload.exp <= Date.now())
            return response.status(404).json("Token Expirado");
    }

    catch(e){
        return response.status(404).json("Error de autenticacion");
    }

    request.usuario = payload;

    next();
}