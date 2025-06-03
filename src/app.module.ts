import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargosModule } from './cargos/cargos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NaipeModule } from './naipe/naipe.module';
import { EscalasModule } from './escalas/escalas.module';

@Module({
  imports: [CargosModule, UsuariosModule, NaipeModule, EscalasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
