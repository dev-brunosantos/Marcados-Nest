import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNaipeDto } from './dto/create-naipe.dto';
import { UpdateNaipeDto } from './dto/update-naipe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NaipeService {

  constructor(private prisma: PrismaService) { }

  private async naipeExistente(nome: string) {
    const naipe = await this.prisma.naipe.findFirst({
      where: { naipe: nome }
    })

    if (naipe) {
      return naipe
    }
  }

  private async naipeId(id: number) {
    const naipeId = await this.prisma.naipe.findFirst({
      where: { id }
    })

    return naipeId
  }

  async criar(createNaipeDto: CreateNaipeDto) {
    const naipeExistente = await this.naipeExistente(createNaipeDto.naipe)

    if (!naipeExistente) {
      const novoNaipe = await this.prisma.naipe.create({
        data: createNaipeDto
      })

      return `O naipe ${novoNaipe.naipe.toUpperCase()} foi criado com sucesso.`
    }

    throw new HttpException("O naipe informado já esta cadastrado no sistema.", HttpStatus.BAD_REQUEST)
  }

  async listar() {
    const naipes = await this.prisma.naipe.findMany()

    if (naipes.length > 0) return naipes

    throw new HttpException("Não existe nenhum naipe cadastrado no sistema.", HttpStatus.NOT_FOUND)
  }

  async listarVozes() {
    const naipes = await this.prisma.naipe.findMany({
      where: { categoria: "Vozes" }
    })

    if (naipes.length > 0) return naipes

    throw new HttpException("Não existe nenhum naipe cadastrado no sistema.", HttpStatus.NOT_FOUND)
  }

  async listarInstrumentos() {
    const naipes = await this.prisma.naipe.findMany({
      where: { categoria: "Instrumentos" }
    })

    if (naipes.length > 0) return naipes

    throw new HttpException("Não existe nenhum naipe cadastrado no sistema.", HttpStatus.NOT_FOUND)
  }

  async buscarNaipeID(id: number) {
    const naipeID = await this.naipeId(id)

    if (naipeID) return naipeID

    throw new HttpException("Não existe nenhum naipe vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  async buscarNaipeNome(nome: string) {
    const naipeNome = await this.naipeExistente(nome)

    if (naipeNome) return naipeNome

    throw new HttpException("Não existe nenhum naipe com esse nome cadastrado no sistema.", HttpStatus.NOT_FOUND)
  }

  async atualizar(id: number, updateNaipeDto: UpdateNaipeDto) {
    const naipeID = await this.naipeId(id)

    if (naipeID) {
      const atualizacao = await this.prisma.naipe.update({
        where: { id },
        data: updateNaipeDto
      })

      return {
        status: "Atualização realizada com sucesso.",
        dadosAntigos: naipeID,
        dadosAtualizados: atualizacao
      }
    }

    throw new HttpException("Não existe nenhum naipe vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  async apagar(id: number) {
    const naipeID = await this.naipeId(id)

    if (naipeID) {
      await this.prisma.naipe.delete({
        where: { id }
      })

      return `O naipe ${naipeID.naipe.toUpperCase()} foi excluído como solicitado.`
    }

    throw new HttpException("Não existe nenhum naipe vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }
}
