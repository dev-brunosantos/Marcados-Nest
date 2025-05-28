import { formataData } from "./formataData";

interface CargosProps {
    id: number;
    nome: string;
    dtCriacao: Date;
    dtAtualizacao: Date;
}

export function formatarDadosCargos(cargosProps: CargosProps): any {

    const payload = {
        id: cargosProps.id,
        cargo: cargosProps.nome,
        criacao: formataData(cargosProps.dtCriacao),
        atualizacao: formataData(cargosProps.dtAtualizacao)
    }

    return payload
}

export function formatarArrayDeCargos(cargos: CargosProps[]): any[] {
    return cargos.map(formatarDadosCargos);
}