import { Module } from '@nestjs/common';
import { NaipeService } from './naipe.service';
import { NaipeController } from './naipe.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NaipeController],
  providers: [NaipeService],
  exports: [NaipeService]
})
export class NaipeModule {}
