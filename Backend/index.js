import express, { response } from "express";
import { articuloRouter } from "./Routes/articulosRoutes.js";

const app = express();

//Midelware: es algo que sae va a ejecutar siempre entre el que recibe datos, y se ejcuta en el backend y los devuelve

// se esta diciendo que se esta trabajando con archivos Json
app.use(express.json());

//puerto por el que estara escuchando
const PORT = 1234;

app.use('/api/articulos',articuloRouter);

app.listen(PORT, () =>{
    console.log("Servidor a la espera");
})