import { Injectable } from '@nestjs/common';
import { CreateCfpDto } from './create-cfp.dto';

@Injectable()
export class AppService {
  private readonly cfpSubmissions: CreateCfpDto[] = [];

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  submitCfp(dto: CreateCfpDto): CreateCfpDto {
    this.cfpSubmissions.push(dto);
    return dto;
  }

  getCfpSubmissions(): CreateCfpDto[] {
    return this.cfpSubmissions;
  }
}

