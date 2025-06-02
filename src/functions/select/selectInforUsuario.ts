export const selectUsuario = {
    id: true,
    nome: true,
    email: true,
    senha: true,
    cargos: {
        select: {
            id: true,
            nome: true
        }
    },
    naipes: {
        select: {
            id: true, 
            naipe: true
        }
    },
    dtCadastro: true,
    dtAtualizacao: true
}