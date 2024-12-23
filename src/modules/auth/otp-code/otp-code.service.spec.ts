import { Test, TestingModule } from '@nestjs/testing';
import { OtpCodeService } from './otp-code.service';

describe('OtpCodeService', () => {
  let service: OtpCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpCodeService],
    }).compile();

    service = module.get<OtpCodeService>(OtpCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
