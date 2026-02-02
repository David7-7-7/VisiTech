import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./ProveedorContexto";
import { Login } from "./Login";

export const ResultadoArticulos = () =>{

    const [usuarioAuth, setUsuarioAuth] = useContext(AuthContext);//revisa si hay o no hay token valido
    const [articulosState, setArticulosState] = useState({});//guarda articulos
    const [exito, setExito] = useState(false);

    useEffect(()=>{
        resultados();
    },[])//se notifique cuando el componente se cargue

    const resultados = async () => {
        try {
            const peticion = await fetch('http://localhost:1234/api/articulos',
                {
                    method: "GET",
                    headers: {
                        "Content-Type":"application/json",
                        "Authorization":usuarioAuth.token
                    }
                });

                const datos= await peticion.json();

                if(peticion.status == 404){
                    setExito(false);
                }else{
                    setExito(true);
                    setArticulosState(datos);
                }
        }catch(e){
            console.log(e);
        }
    }

    return (
        <>
        <ul>
            {exito?articulosState.map((articulo)=>{
                return (
                    <li key= {(articulo._id)}>{articulo.titulo}</li>
                )
            }):<Login/>}
        </ul>
        </>
    )
}