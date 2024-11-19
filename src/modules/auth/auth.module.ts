import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgetModule } from './forget/forget.module';

@Module({
  imports: [LoginModule],
  exports: [LoginModule],
  controllers: [],
})
export class AuthModule {}
