import zod from 'zod';

const usuarioSchema = zod.object({//solo acepta los valores que definimos
    id: zod.number().min(1),
    nick: zod.string().min(1),//el tipo de dato lo define zod
    password: zod.string().min(1),
    mail: zod.string().min(1)
})

export const validarUsuario = (usuario) => {
    return usuarioSchema.safeParse(usuario);//valida la info
}