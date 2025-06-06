import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { formatarArrayDeCargos, formatarDadosCargos } from 'src/functions/formatacao/dadosCargos';

@Injectable()
export class CargosService {

  constructor(private prisma: PrismaService) { }

  private async cargoExistente(cargo: string) {
    const cargoExistente = await this.prisma.cargo.findFirst({
      where: {
        nome: cargo
      }
    })

    if(cargoExistente) {
      var infor = formatarDadosCargos(cargoExistente)
      return infor
    }
  }

  private async cargoId(id: number) {
    const cargoId = await this.prisma.cargo.findFirst({
      where: { id }
    })

    if(cargoId) {
      var infor = formatarDadosCargos(cargoId)
      return infor
    }
  }

  async criar(createCargoDto: CreateCargoDto) {
    const cargo = await this.cargoExistente(createCargoDto.nome);
    if (!cargo) {
      const novoCargo = await this.prisma.cargo.create({
        data: createCargoDto
      });

      return `O cargo ${novoCargo.nome.toUpperCase()} foi criado com sucesso.`;
    }

    throw new HttpException("O cargo informado já existe no sistema.", HttpStatus.BAD_REQUEST)
  }

  async listar() {
    const cargos = await this.prisma.cargo.findMany()
    if (cargos.length > 0) {
      var cargosFormatados = formatarArrayDeCargos(cargos)
      return cargosFormatados;
    }

    throw new HttpException("Não existem cargos cadastrados no sistema.", HttpStatus.NOT_FOUND);
  }

  async filtrarID(id: number) {
    const idCargo = await this.cargoId(id);
    if (idCargo) {
      return idCargo;
    }
    throw new HttpException("O cargo informado não existe no sistema.", HttpStatus.NOT_FOUND);
  }

  async filtrarNome(nome: string) {
    const cargoNome = await this.cargoExistente(nome);
    if (cargoNome) {
      return cargoNome;
    }
    throw new HttpException("O cargo informado não existe no sistema.", HttpStatus.NOT_FOUND);
  }

  async atualizar(id: number, updateCargoDto: UpdateCargoDto) {
    const cargoId = await this.cargoId(id);

    if (cargoId) {
      const cargoAtualizado = await this.prisma.cargo.update({
        where: { id },
        data: updateCargoDto
      })

      return {
        status: "Atualização realizada com sucesso.",
        dadosAntigos: cargoId,
        atualizacao: cargoAtualizado
      }
    }
    throw new HttpException("O cargo informado não existe no sistema.", HttpStatus.NOT_FOUND);
  }

  async apagar(id: number) {
    const cargoId = await this.cargoId(id);
    if (cargoId) {
      await this.prisma.cargo.delete({
        where: { id }
      });
      return `O cargo ${cargoId.nome.toUpperCase()} foi excluido com sucesso.`
    }
    throw new HttpException("O cargo informado não existe no sistema.", HttpStatus.NOT_FOUND);
  }
}
