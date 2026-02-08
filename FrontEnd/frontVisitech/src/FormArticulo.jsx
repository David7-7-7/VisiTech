import React, { useContext, useEffect, useState } from 'react';
import './FormArticulo.css';
import { AuthContext } from './ProveedorContexto';

export const FormArticulo = ({ articuloPadre }) => {
    // 1. Estado unificado para el formulario (Controlado)
    const [formulario, setFormulario] = useState({ titulo: "", cuerpo: "" });
    const [editando, setEditando] = useState(false);
    const [auth] = useContext(AuthContext);

    // 2. Sincronización: Cuando haces clic en editar en la tabla, este efecto rellena los campos
    useEffect(() => {
        if (articuloPadre.articuloEdit && articuloPadre.articuloEdit._id) {
            setFormulario({
                titulo: articuloPadre.articuloEdit.titulo,
                cuerpo: articuloPadre.articuloEdit.cuerpo
            });
            setEditando(true);
        } else {
            limpiarFormulario();
        }
    }, [articuloPadre.articuloEdit]);

    // 3. Manejador de cambios (necesario para componentes controlados)
    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const limpiarFormulario = () => {
        setFormulario({ titulo: "", cuerpo: "" });
        setEditando(false);
        if (articuloPadre.articuloEdit) {
            articuloPadre.articuloEdit._id = null; // Resetear referencia del padre
        }
    };

    const cancelarEdicion = (e) => {
        e.preventDefault(); // Evitamos que el botón haga submit
        limpiarFormulario();
    };

    const recogerForm = (e) => {
        e.preventDefault();

        // Usamos directamente el estado 'formulario' que ya tiene los datos
        if (!editando) {
            guardarArticulo(formulario);
        } else {
            editarArticulo(formulario, articuloPadre.articuloEdit._id);
        }

        limpiarFormulario();
    };

    // --- Funciones de API ---
    const guardarArticulo = async (articulo) => {
        let articuloCompleto = { ...articulo, usuario: auth.nick };
        try {
            await fetch('http://localhost:1234/api/articulos', {
                method: "POST",
                body: JSON.stringify(articuloCompleto),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth.token
                }
            });
        } catch (e) {
            console.log("Error al guardar:", e);
        }
    };

    const editarArticulo = async (articulo, id) => {
        let articuloCompleto = { ...articulo, usuario: auth.nick };
        try {
            await fetch('http://localhost:1234/api/articulos/' + id, {
                method: "PUT",
                body: JSON.stringify(articuloCompleto),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth.token
                }
            });
        } catch (e) {
            console.log("Error al editar:", e);
        }
    };

    return (
        <>
            <div className="screen-1">
                {/* Mantenemos tus links de fuentes e iconos */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20,400,0,0" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
                
                <h2>INTRODUCE ARTÍCULO</h2>
                {editando && <h3 style={{ color: "red" }}>EDITANDO ARTICULO</h3>}

                <form onSubmit={recogerForm}>
                    <div className="titulo">
                        <label htmlFor='titulo'>Título</label>
                        <div className="sec-2">
                            <span className="material-symbols-outlined">title</span>
                            <input 
                                type='text' 
                                name='titulo' 
                                id='titulo' 
                                placeholder='Título' 
                                value={formulario.titulo} // Vinculado al estado
                                onChange={manejarCambio} // Permite escribir
                            />
                        </div>
                    </div>

                    <div className="cuerpo">
                        <label htmlFor='cuerpo'>Cuerpo</label>
                        <div className="sec-2">
                            <span className="material-symbols-outlined">description</span>
                            <textarea 
                                name='cuerpo' 
                                id='cuerpo' 
                                placeholder='cuerpo' 
                                rows="4" 
                                cols="50" 
                                value={formulario.cuerpo} // Vinculado al estado
                                onChange={manejarCambio} // Permite escribir
                            />
                        </div>
                    </div>

                    <input className="articulo" type='submit' value={editando ? "ACTUALIZAR" : "GUARDAR"} />
                    
                    {editando && (
                        <button 
                            type="button" 
                            onClick={cancelarEdicion} 
                            style={{ marginTop: "10px", backgroundColor: "#ccc" }}
                        >
                            Cancelar Edición
                        </button>
                    )}
                </form>
            </div>
        </>
    );
};