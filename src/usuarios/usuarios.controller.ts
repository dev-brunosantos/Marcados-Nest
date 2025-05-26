import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  cadastro(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.cadastro(createUsuarioDto);
  }

  @Get()
  listagem() {
    return this.usuariosService.listarUsuarios();
  }

  @Get(':id')
  usuarioID(@Param('id') id: string) {
    return this.usuariosService.filtrarUsuaroID(id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.atualizar(id, updateUsuarioDto);
  }

  @Delete(':id')
  apagar(@Param('id') id: string) {
    return this.usuariosService.apagarDados(id);
  }
}
