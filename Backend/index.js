import express, { response } from "express";
import { Enrutador } from "./Routes/articulosRoutes.js";
import { CreadorUsuarios } from "./Routes/usuariosRoutes.js";
import { Articulo } from "./models/Articulo.js";
import { Usuario } from "./models/Usuario.js";
import {auth} from "./middlewares/auth.js";

const app = express();

//Midelware: es algo que sae va a ejecutar siempre entre el que recibe datos, y se ejcuta en el backend y los devuelve

// se esta diciendo que se esta trabajando con archivos Json
app.use(express.json());

//puerto por el que estara escuchando
const PORT = 1234;

app.use('/api/articulos' ,auth,Enrutador(Articulo));
app.use('/api/usuarios',CreadorUsuarios(Usuario));

// Comprobamos si tiene token, si no es asi o esta expirado no dejara entrar

app.listen(PORT, () =>{
    console.log("Servidor a la espera");
})