import { PartialType } from '@nestjs/mapped-types';
import { CreateVozDto } from './create-voz.dto';

export class UpdateVozDto extends PartialType(CreateVozDto) {}
