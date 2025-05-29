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

    return naipe
  }

  private async naipeId(id: number) {
    const naipeId = await this.prisma.naipe.findFirst({
      where: { id }
    })

    return naipeId
  }

  async criar(createNaipeDto: CreateNaipeDto) {
    const naipeExistente = await this.naipeExistente(createNaipeDto.naipe)

    if(!naipeExistente) {
      const novoNaipe = await this.prisma.naipe.create({
        data: createNaipeDto
      })

      return `O naipe ${novoNaipe.naipe.toUpperCase()} foi criado com sucesso.`
    }

    throw new HttpException("O naipe informado já esta cadastrado no sistema.", HttpStatus.BAD_REQUEST)
  }

  async listar() {
    const naipes = await this.prisma.naipe.findMany()

    if(naipes.length > 0) return naipes

    throw new HttpException("Não existe nenhum naipe cadastrado no sistema.", HttpStatus.NOT_FOUND)
  }

  async buscarNaipeID(id: number) {
    const naipeID = await this.naipeId(id)

    if (naipeID) return naipeID

    throw new HttpException("Não existe nenhum naipe vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  update(id: number, updateNaipeDto: UpdateNaipeDto) {
    return `This action updates a #${id} naipe`;
  }

  async apagar(id: number) {
    const naipeID = await this.naipeId(id)
    
    if(naipeID) {
      await this.prisma.naipe.delete({
        where: { id }
      })

      return `O naipe ${naipeID.naipe.toUpperCase()} foi excluído como solicitado.`
    }

    throw new HttpException("Não existe nenhum naipe vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }
}
