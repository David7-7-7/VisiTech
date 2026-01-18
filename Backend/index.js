import { articulos } from "./datos/articulos.js";
import express, { response } from "express";
import { validarArticulo, validarParcial } from "./helpers/zod.js";

const app = express();

//Midelware: es algo que sae va a ejecutar siempre entre el que recibe datos, y se ejcuta en el backend y los devuelve

// se esta diciendo que se esta trabajando con archivos Json
app.use(express.json());

//puerto por el que estara escuchando
const PORT = 1234;

let articulosDevolver = articulos;

app.get('/api/articulos', (request, response) => { //peticiones http (get)
    response.json(articulosDevolver)
})

app.get('/api/articulos/:id', (request, response) => {//peticiones http (get)
    const id= Number(request.params.id);

    const articulo = articulosDevolver.find(articulo => articulo.id == id);

    if(articulo){
        response.json(articulo);
    } else{
        response.status(400).end();
    }

})

app.delete('/api/articulos/:id', (request,response) => {//peticion eliminar
    const id= Number(request.params.id);
    articulosDevolver = articulosDevolver.filter(articulo => articulo.id != id);

    if(articulosDevolver){
        response.json(articulosDevolver);
    }else{
        response.status(400).end();
    }
})

app.post('/api/articulos',(request, response) => {
    const articulo = validarArticulo(request.body);

    if (articulo.error){
        return response.status(400).json('Validación incorrecta')
    }

    const nuevoArticulo = {
        ...articulo.data
    }

    articulosDevolver = [...articulosDevolver,nuevoArticulo];

    response.json(nuevoArticulo); //solo se muestra el nuevo dato
    //response.json(articulosDevolver);
 })

 app.put('/api/articulos/:id', (request, response) => {
    const id= Number(request.params.id);
    const articuloValidado = validarParcial(request.body);

    if (articuloValidado.error){
        return response.status(400).json('Validación incorrecta')
    }

    const articuloIndice = articulosDevolver.findIndex(articulo => articulo.id == id);

    if(articuloIndice == -1){
        return response.status(400).json ('Articulo no encontrado');
    }

    const nuevoArticulo ={
        ...articulosDevolver[articuloIndice],
        ...articuloValidado.data
    }

    articulosDevolver[articuloIndice] = nuevoArticulo;

    response.json(nuevoArticulo);
 })

app.listen(PORT, () =>{
    console.log("Servidor a la espera");
})