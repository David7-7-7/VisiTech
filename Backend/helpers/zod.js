import zod from 'zod';

const articuloSchema = zod.object({//solo acepta los valores que definimos
    id: zod.number(),
    titulo: zod.string(),//el tipo de dato lo define zod
    cuerpo: zod.string(),
    usuario: zod.string()
})

export const validarArticulo = (articulo) => {
    return articuloSchema.safeParse(articulo);//valida la info
}

export const validarParcial = (articulo) =>{
    return articuloSchema.partial().safeParse(articulo);
}