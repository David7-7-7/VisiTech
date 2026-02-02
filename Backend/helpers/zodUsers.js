import zod from 'zod';

const usuarioSchema = zod.object({//solo acepta los valores que definimos
    // id: zod.int().min(1),  EN CUALQUIER MOMENTO NECESITAREMOS AGREGAR UN MIN
    nick: zod.string(),//el tipo de dato lo define zod
    password: zod.string(),
    mail: zod.string()
})

export const validarUsuario = (usuario) => {
    return usuarioSchema.safeParse(usuario);//valida la info
}