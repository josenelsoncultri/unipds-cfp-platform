import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateCfpDto } from './create-cfp.dto';
import { SpeakerDTO } from '@cfp-platform/shared-types';

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
}

