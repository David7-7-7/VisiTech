import React, { useState } from "react";
import {NavLink} from 'react-router-dom';

export const Login = () => {
  const [formulario, setformulario] = useState({});// Creamos un objeto vacio
  const [exito, setExito] = useState(false);

  const recogerForm = (e) =>{
    e.preventDefault();

    let usuario =
    {
        nick: e.target.usuario.value,
        password: e.target.password.value
    }

    setformulario(usuario); 
    buscar(usuario);
  }
  // Buscamos los datos en la API 
  const buscar = async(usuario)=>{
    try {
        const peticion = await fetch('http://localhost:1234/api/usuarios/login',
            {
                method: "POST",
                body: JSON.stringify(usuario),
                headers: {
                    "Content-Type":"application/json"
                }
            });

            const datos = await peticion.json();

            if (datos.status == 400)
            {
                setExito(false);
            }
            else{
                setExito(true);
                localStorage.setItem("usuario",JSON.stringify(datos));
            }
    }
    catch(e){
        console.log(e);
        setformulario({});
    }
  }

    return(// Combinamos varios lenguajes dentro 
    <>
        <form onSubmit={recogerForm}> 
            <label htmlFor='usuario'>Usuario</label>
            <input type='text' name='usuario' id='usuario' placeholder='Usuario'/>

            <label htmlFor='password'>Password</label>
            <input text='text' name='password' id='password' placeholder='Password'/>

            <input type='submit'/>
        </form>

    </>
    )
}