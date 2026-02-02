import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./Login.jsx";
import { Registro } from "./Registro.jsx";

export const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registro' element={<Registro/>}/>                
                <Route path='*' element={<h1>Error no existe la pagina, 404</h1>}/>
            </Routes>         
        </BrowserRouter>
    )
}