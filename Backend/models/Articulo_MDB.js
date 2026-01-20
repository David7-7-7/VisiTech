import mongoose, { model, Schema } from "mongoose";
import { conexion } from "../helpers/conexion.js";
import express, { response } from "express";

conexion();

const articuloSchema = new Schema(
    {
        titulo: String,
        cuerpo: String,
        usuario: String
    },
    {
        versionKey: false
    }
)

const Articulo = model('Articulo', articuloSchema);

export class ArticuloModel{

    static async getAll(){
        try{
            return Articulo.find();
        }catch(e){
            console.log(e);
        }
    }

    static async getOneByID(id){
        try{
            return await Articulo.findById(id);
        }catch(e){
            console.log(e);
        }
    }

    static async delete(id){

        try{
            return Articulo.deleteOne({_id: id});//el id es el que está almacenado, para que el mongo reconozca
        }catch(e){
            console.log(e);
        }
    }

    static async create(articulo){
        if (!articulo.success){
            return Error;
        }

        const nuevoArticulo = {
            ...articulo.data
        }

        const articuloGuardar = new Articulo(nuevoArticulo);

        try{
            await articuloGuardar.save();
            return nuevoArticulo;
        }catch(e){
            console.log(e);
        }
    }

    static async update(id,validacion){
        if (!validacion.success){//no hay validacion positiva
            response.status(400).json('Validación incorrecta')
        }

        try{
            return await Articulo.findOneAndUpdate({_id: id},{...validacion.data}, {new:true});//busca el articulo y lo actualiza
                                                                                //{new:true} nos devuelve el objeto cuando ya está actualizado
        }catch(e){
            console.log(e);
        }
    }

}