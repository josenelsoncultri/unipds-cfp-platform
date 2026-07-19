import { SpeakerDTO } from '@cfp-platform/shared-types';
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';

export class CreateCfpDto implements SpeakerDTO {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  talkTitle: string;

  @IsBoolean()
  isGDE: boolean;
}
