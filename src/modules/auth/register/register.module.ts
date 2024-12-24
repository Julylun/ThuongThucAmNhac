import { Module } from '@nestjs/common';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';
import { PersonService } from 'src/modules/person/person.service';
import { GmailModule } from 'src/modules/gmail/gmail.module';
import { GmailService } from 'src/modules/gmail/gmail.service';
import { PersonModule } from 'src/modules/person/person.module';
import { OtpCodeModule } from '../otp-code/otp-code.module';
import { OtpCodeService } from '../otp-code/otp-code.service';

@Module({
  imports: [
    PersonModule,
    OtpCodeModule,
    GmailModule
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    PersonService,
    GmailService,
    OtpCodeService
  ]
})
export class RegisterModule { }
