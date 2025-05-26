import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Controller('cargos')
export class CargosController {
  constructor(private readonly cargosService: CargosService) {}

  @Post()
  criarCargo(@Body() createCargoDto: CreateCargoDto) {
    return this.cargosService.criar(createCargoDto);
  }

  @Get()
  listarCargos() {
    return this.cargosService.listar();
  }

  @Get(':id')
  CargoID(@Param('id') id: string) {
    return this.cargosService.filtrarID(+id);
  }

  @Get('/nome/:cargo')
  cargoNome(@Param('cargo') cargo: string) {
    return this.cargosService.filtrarNome(cargo);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargosService.atualizar(+id, updateCargoDto);
  }

  @Delete(':id')
  apagar(@Param('id') id: string) {
    return this.cargosService.apagar(+id);
  }
}
