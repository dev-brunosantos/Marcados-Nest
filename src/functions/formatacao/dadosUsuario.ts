import { formataData } from "./formataData";

export interface UsuarioProps {
    id: string;
    nome: string;
    email: string;
    cargos: {
        nome: string;
    };
    naipes: {
        naipe : string;
    };
    dtCadastro?: Date;
    dtAtualizacao?: Date;
}

export function formatarDadosUsuario(usuarioProps: UsuarioProps): any {
    
    const infor = {
        id: usuarioProps.id,
        nome: usuarioProps.nome,
        email: usuarioProps.email,
        cargo: usuarioProps.cargos.nome,
        naipe: usuarioProps.naipes.naipe,
        cadastro: formataData(usuarioProps.dtCadastro),
        atualizacao: formataData(usuarioProps.dtAtualizacao)
    }

    return infor
}

export function formatarArrayDeUsuarios(usuarios: UsuarioProps[]): any[] {
    return usuarios.map(formatarDadosUsuario);
}