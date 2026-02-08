import React, { useContext } from "react";
import { AuthContext } from "./ProveedorContexto.jsx";
import { Login } from "./Login.jsx";
import { ResultadoArticulos } from "./ResultadoArticulos.jsx";
import './Articulos.css'

export const Articulos = () => {

    const [usuarioAuth, setUsuarioAuth] = useContext(AuthContext)

    return (
        <>
        {usuarioAuth == null ? <Login/> : <ResultadoArticulos/>}
        </>
    )
}                 