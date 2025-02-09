import { Test, TestingModule } from '@nestjs/testing';
import { TextSpeechController } from './text-speech.controller';

describe('TextSpeechController', () => {
  let controller: TextSpeechController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TextSpeechController],
    }).compile();

    controller = module.get<TextSpeechController>(TextSpeechController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
