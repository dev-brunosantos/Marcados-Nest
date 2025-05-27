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
    dtCadastro: true,
    dtAtualizacao: true
}