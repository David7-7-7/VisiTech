import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'

export const Registro = () => {
  const [formulario, setFormulario] = useState({});
  const [exito, setExito] = useState(false);

  const recogerForm = () =>{
    e.preventDefault();

    let usuario=
    {
        nick: e.target.usuario.value,
        mail: e.target.mail.value,
        password: e.target.password.value
    }
    setFormulario(usuario);
    
    // Guardamos los datos 
    guardarUsuario(usuario);
  }
    const guardarUsuario = async(usuario) =>{

        try{
            const peticion = await fetch('http://localhost:1234/api/usuarios',
                {
                    method: "POST",
                    body: JSON.stringify(usuario),
                    headers: {
                        "Content-Type":"application/json"
                    }
                });

            const datos = peticion-json();

            !datos?setExito(false):setExito(true); //Es lo mismo que un IF pero de otra manera escrita
        }

        catch(e){
            console.log(e);
            setFormulario({});
        }
    }

  


    return(
        <form onSubmit={recogerForm}>
            <label htmlFor='usuario'>Usuario</label>
            <input type='text' name='usuario' id='usuario' placeholder='Usuario'/>

            <label htmlFor='mail'>E-mail</label>
            <input type='email' name='mail' id='mail' placeholder='E-mail'/>

            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' />

            <input type='submit' />

        </form>
    )
}