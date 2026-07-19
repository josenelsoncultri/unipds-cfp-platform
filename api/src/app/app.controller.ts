import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCfpDto } from './create-cfp.dto';
import { CreateEventDto } from './create-event.dto';
import { SpeakerDTO, EventDTO } from '@cfp-platform/shared-types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('cfp')
  submitCfp(@Body() dto: CreateCfpDto) {
    return this.appService.submitCfp(dto);
  }

  @Get('cfp')
  getCfp(): SpeakerDTO[] {
    return this.appService.getCfpSubmissions();
  }

  @Post('event')
  submitEvent(@Body() dto: CreateEventDto) {
    return this.appService.submitEvent(dto);
  }

  @Get('event')
  getEvents(): EventDTO[] {
    return this.appService.getEvents();
  }
}
