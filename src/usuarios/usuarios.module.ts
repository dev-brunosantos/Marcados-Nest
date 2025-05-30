import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CargosModule } from 'src/cargos/cargos.module';
import { NaipeModule } from 'src/naipe/naipe.module';

@Module({
  imports: [PrismaModule, CargosModule, NaipeModule],
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuariosModule { }
