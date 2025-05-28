import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CargosModule } from './cargos/cargos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VozModule } from './voz/voz.module';

@Module({
  imports: [CargosModule, UsuariosModule, VozModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
