import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NaipeService } from './naipe.service';
import { CreateNaipeDto } from './dto/create-naipe.dto';
import { UpdateNaipeDto } from './dto/update-naipe.dto';

@Controller('naipe')
export class NaipeController {
  constructor(private readonly naipeService: NaipeService) {}

  @Post()
  criar(@Body() createNaipeDto: CreateNaipeDto) {
    return this.naipeService.criar(createNaipeDto);
  }

  @Get()
  listar() {
    return this.naipeService.listar();
  }

  @Get('/vozes')
  listarVozes() {
    return this.naipeService.listarVozes();
  }

  @Get('instrumentos')
  listarInstrumentos() {
    return this.naipeService.listarInstrumentos();
  }

  @Get(':id')
  filtarID(@Param('id') id: string) {
    return this.naipeService.buscarNaipeID(+id);
  }

  @Patch(':id')
  atualizar(@Param('id') id: string, @Body() updateNaipeDto: UpdateNaipeDto) {
    return this.naipeService.atualizar(+id, updateNaipeDto);
  }

  @Delete(':id')
  apagar(@Param('id') id: string) {
    return this.naipeService.apagar(+id);
  }
}
