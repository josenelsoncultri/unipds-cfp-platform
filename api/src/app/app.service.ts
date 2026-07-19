import { Injectable } from '@nestjs/common';
import { CreateCfpDto } from './create-cfp.dto';
import { CreateEventDto } from './create-event.dto';

@Injectable()
export class AppService {
  private readonly cfpSubmissions: CreateCfpDto[] = [];
  private readonly eventLocations: CreateEventDto[] = [];

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

  submitEvent(dto: CreateEventDto): CreateEventDto {
    this.eventLocations.push(dto);
    return dto;
  }

  getEvents(): CreateEventDto[] {
    return this.eventLocations;
  }
}
