import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CargosService } from 'src/cargos/cargos.service';
import { hash } from 'bcrypt';
import { formatarArrayDeUsuarios, formatarDadosUsuario } from 'src/functions/formatacao/dadosUsuario';
import { selectUsuario } from 'src/functions/select/selectInforUsuario';
import { NaipeService } from 'src/naipe/naipe.service';

@Injectable()
export class UsuariosService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly cargos: CargosService,
    private readonly naipe: NaipeService
  ) { }

  async usuarioInfor(dado: string) {
    const usuario = await this.prisma.usuario.findFirst({
      where: {
        OR: [
          { id: dado },
          { nome: dado },
          { email: dado },
        ]
      },
      select: selectUsuario
    })

    if (usuario) {
      var infor = formatarDadosUsuario(usuario)
      return infor;
    }
  }

  async cadastro(createUsuarioDto: CreateUsuarioDto) {
    const usuarioExistente = await this.usuarioInfor(createUsuarioDto.email);

    if (!usuarioExistente) {
      const senhaCriptografada = await hash(createUsuarioDto.senha, 10);
      const cargoId = await this.cargos.filtrarNome(createUsuarioDto.cargo);
      const naipeId = await this.naipe.buscarNaipeNome(createUsuarioDto.naipe)

      if (!cargoId) {
        throw new HttpException('Cargo não encontrado', HttpStatus.NOT_FOUND);
      }

      if (!naipeId) {
        throw new HttpException('Naipe não encontrado', HttpStatus.NOT_FOUND);
      }


      const novoUsuario = await this.prisma.usuario.create({
        data: {
          nome: createUsuarioDto.nome,
          email: createUsuarioDto.email,
          senha: senhaCriptografada,
          // cargoId: cargoId.id
          cargos: {
            connect: {
              id: cargoId.id
            }
          },
          naipes: {
            connect: {
              id: naipeId.id
            }
          }
        }
      })

      return `O usuário ${novoUsuario.nome.toUpperCase()} foi cadastrado com sucesso!`;
    }

    throw new HttpException('Usuário já cadastrado', HttpStatus.BAD_REQUEST);
  }

  async listarUsuarios() {
    const usuarios = await this.prisma.usuario.findMany({
      select: selectUsuario
    })

    if (usuarios.length > 0) {
      var usuariosInfor = formatarArrayDeUsuarios(usuarios);
      return  usuariosInfor
    }

    throw new HttpException('Nenhum usuário encontrado', HttpStatus.NOT_FOUND);
  }

  async filtrarUsuaroID(id: string) {
    const usuarioID = await this.usuarioInfor(id);

    if (usuarioID) {
      return usuarioID;
    }

    throw new HttpException('O ID informado não esta vinculado a nenhum usuário cadastrado no sistema.', HttpStatus.NOT_FOUND);
  }

  async listarUsuariosMinistro() {
    const usuarios = await this.prisma.usuario.findMany({
      where: {
        cargos: {
          nome: "Ministro"
        }
      },
      select: selectUsuario
    })

    if (usuarios.length > 0) {
      var usuariosInfor = formatarArrayDeUsuarios(usuarios);
      return  usuariosInfor
    }

    throw new HttpException('Nenhum ministro encontrado.', HttpStatus.NOT_FOUND);
  }

  async atualizar(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    const usuarioID = await this.filtrarUsuaroID(id);
    const cargoId = await this.cargos.filtrarNome(updateUsuarioDto.cargo);

    if (!cargoId) {
      throw new HttpException('Cargo não encontrado', HttpStatus.NOT_FOUND);
    }

    if (usuarioID) {
      const usuarioAtualizado = await this.prisma.usuario.update({
        where: {
          id: usuarioID.id
        },
        data: {
          nome: updateUsuarioDto.nome === undefined ? usuarioID.nome : updateUsuarioDto.nome,
          cargos: {
            connect: {
              id: cargoId.id
            }
          }
        }
      })

      // return `O usuário ${usuarioAtualizado.nome.toUpperCase()} foi atualizado com sucesso!`;
      return {
        status: "Atualização realizada com sucesso",
        dadosAntigos: usuarioID,
        dadosNovos: usuarioAtualizado
      }
    }

    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }

  async apagarDados(id: string) {
    const usuarioID = await this.filtrarUsuaroID(id);

    if (usuarioID) {
      await this.prisma.usuario.delete({
        where: {
          id: usuarioID.id
        }
      })

      return `O usuário ${usuarioID.nome.toUpperCase()} foi removido com sucesso!`;
    }
    throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
  }
}
