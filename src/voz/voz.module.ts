import { Module } from '@nestjs/common';
import { VozService } from './voz.service';
import { VozController } from './voz.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VozController],
  providers: [VozService],
  exports: [VozService]
})
export class VozModule {}
