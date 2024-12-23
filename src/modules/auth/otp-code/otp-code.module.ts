import { forwardRef, Module } from '@nestjs/common';
import { OtpCodeController } from './otp-code.controller';
import { OtpCodeService } from './otp-code.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpCode } from './entity/otp-code.entity';
import { PersonModule } from 'src/modules/person/person.module';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT_KEY } from 'src/common/constant/jwt.constant';
import { PersonService } from 'src/modules/person/person.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpCode]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT_KEY,
      signOptions: { expiresIn: '2h' }
    }),
    forwardRef(() => PersonModule)
  ],
  controllers: [OtpCodeController],
  providers: [OtpCodeService, PersonService],
  exports: [OtpCodeService, TypeOrmModule]
})
export class OtpCodeModule { }
