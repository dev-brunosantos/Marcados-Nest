import { Module } from '@nestjs/common';
import { NaipeService } from './naipe.service';
import { NaipeController } from './naipe.controller';

@Module({
  controllers: [NaipeController],
  providers: [NaipeService],
})
export class NaipeModule {}
