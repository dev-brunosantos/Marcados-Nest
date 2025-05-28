import { formataData } from "./formataData";

export interface UsuarioProps {
    id: string;
    nome: string;
    email: string;
    cargos: {
        nome: string;
    },
    dtCadastro?: Date;
    dtAtualizacao?: Date;
}

export function formatarDadosUsuario(usuarioProps: UsuarioProps): any {
    
    // var { nome, email, cargos, dtCadastro, dtAtualizacao } = usuarioProps

    const infor = {
        id: usuarioProps.id,
        nome: usuarioProps.nome,
        email: usuarioProps.email,
        cargo: usuarioProps.cargos.nome,
        cadastro: formataData(usuarioProps.dtCadastro),
        atualizacao: formataData(usuarioProps.dtAtualizacao)
    }
    // const infor = {
    //     // id,
    //     nome,
    //     email,
    //     cargo: cargos.nome,
    //     dtCadastro: formataData(dtCadastro),
    //     dtAtualizacao: formataData(dtAtualizacao)
    // }

    return infor
}

export function formatarArrayDeUsuarios(usuarios: UsuarioProps[]): any[] {
    return usuarios.map(formatarDadosUsuario);
}