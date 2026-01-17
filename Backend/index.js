import { articulos } from "./datos/articulos.js";
import express from "express";

const app = express();

//Midelware: es algo que sae va a ejecutar siempre entre el que recibe datos, y se ejcuta en el backend y los devuelve

// se esta diciendo que se esta trabajando con archivos Json
app.use(express.json());

//puerto por el que estara escuchando
const PORT = 1234;

let articulosDevolver = articulos;

app.get('/api/articulos', (request, response) => {
    response.json(articulosDevolver)
})

app.get('/api/articulos/:id', (request, response) => {
    const id= Number(request.params.id);

    const articulo = articulosDevolver.find(articulo => articulo.id == id);

    if(articulo){
        response.json(articulo);
    } else{
        response.status(400).end();
    }

})

app.listen(PORT, () =>{
    console.log("Servidor a la espera");
})