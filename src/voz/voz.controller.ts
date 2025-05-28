import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VozService } from './voz.service';
import { CreateVozDto } from './dto/create-voz.dto';
import { UpdateVozDto } from './dto/update-voz.dto';

@Controller('voz')
export class VozController {
  constructor(private readonly vozService: VozService) {}

  @Post()
  create(@Body() createVozDto: CreateVozDto) {
    return this.vozService.create(createVozDto);
  }

  @Get()
  findAll() {
    return this.vozService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vozService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVozDto: UpdateVozDto) {
    return this.vozService.update(+id, updateVozDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vozService.remove(+id);
  }
}
