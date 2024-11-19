import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgetModule } from './forget/forget.module';
import { AccesstokenModule } from './accesstoken/accesstoken.module';

@Module({
  imports: [LoginModule, RegisterModule, AccesstokenModule],
  exports: [LoginModule],
  controllers: [],
})
export class AuthModule {}
