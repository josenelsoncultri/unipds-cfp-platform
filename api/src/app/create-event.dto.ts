import { EventDTO } from '@cfp-platform/shared-types';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventDto implements EventDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  endereco: string;

  @IsNumber()
  @IsNotEmpty()
  capacidade: number;

  @IsString()
  @IsNotEmpty()
  data: string;
}
