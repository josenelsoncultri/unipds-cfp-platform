import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateCfpDto } from './create-cfp.dto';
import { ValidationPipe, ArgumentMetadata, BadRequestException } from '@nestjs/common';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let validationPipe: ValidationPipe;
  let metadata: ArgumentMetadata;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    validationPipe = new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    metadata = {
      type: 'body',
      metatype: CreateCfpDto,
      data: '',
    };
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('submitCfp', () => {
    it('should successfully store and return a valid CFP', () => {
      const validCfp: CreateCfpDto = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: true,
      };

      const result = appController.submitCfp(validCfp);
      expect(result).toEqual(validCfp);
    });
  });

  describe('getCfp', () => {
    it('should return array of submitted SpeakerDTO proposals', () => {
      const proposals = appController.getCfp();
      expect(Array.isArray(proposals)).toBe(true);
      expect(proposals.length).toBeGreaterThanOrEqual(1);
    });
  });


  describe('ValidationPipe validation', () => {
    it('should pass validation with a valid payload', async () => {
      const validPayload = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: true,
      };

      const result = await validationPipe.transform(validPayload, metadata);
      expect(result).toEqual(validPayload);
    });

    it('should fail validation when name is missing', async () => {
      const invalidPayload = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'john.doe@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: true,
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata),
      ).rejects.toThrow(BadRequestException);
    });

    it('should fail validation when email is invalid', async () => {
      const invalidPayload = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        email: 'invalid-email-format',
        talkTitle: 'NestJS and Signals',
        isGDE: true,
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata),
      ).rejects.toThrow(BadRequestException);
    });

    it('should fail validation when an extra field is present', async () => {
      const invalidPayload = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        email: 'john.doe@example.com',
        talkTitle: 'NestJS and Signals',
        isGDE: true,
        extraField: 'not-allowed',
      };

      await expect(
        validationPipe.transform(invalidPayload, metadata),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
