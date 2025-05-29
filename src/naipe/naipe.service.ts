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

  create(createNaipeDto: CreateNaipeDto) {
    return 'This action adds a new naipe';
  }

  findAll() {
    return `This action returns all naipe`;
  }

  async buscarNaipeID(id: number) {
    const naipeID = await this.naipeId(id)

    if (naipeID) return naipeID

    throw new HttpException("Não existe nenhum naipe vinculado ao ID informado.", HttpStatus.NOT_FOUND)
  }

  update(id: number, updateNaipeDto: UpdateNaipeDto) {
    return `This action updates a #${id} naipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} naipe`;
  }
}
