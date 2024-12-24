import { Test, TestingModule } from '@nestjs/testing';
import { OtpCodeController } from './otp-code.controller';

describe('OtpCodeController', () => {
  let controller: OtpCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpCodeController],
    }).compile();

    controller = module.get<OtpCodeController>(OtpCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
