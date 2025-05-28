import { Module } from '@nestjs/common';
import { VozService } from './voz.service';
import { VozController } from './voz.controller';

@Module({
  controllers: [VozController],
  providers: [VozService],
})
export class VozModule {}
