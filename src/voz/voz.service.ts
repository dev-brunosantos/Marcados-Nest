import { Injectable } from '@nestjs/common';
import { CreateVozDto } from './dto/create-voz.dto';
import { UpdateVozDto } from './dto/update-voz.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VozService {

  constructor(
    private prisma: PrismaService
  ) {}

  create(createVozDto: CreateVozDto) {
    return 'This action adds a new voz';
  }

  findAll() {
    return `This action returns all voz`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voz`;
  }

  update(id: number, updateVozDto: UpdateVozDto) {
    return `This action updates a #${id} voz`;
  }

  remove(id: number) {
    return `This action removes a #${id} voz`;
  }
}
