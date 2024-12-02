import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { ForgetModule } from './forget/forget.module';
import { AccesstokenModule } from './accesstoken/accesstoken.module';
import { RefreshtokenModule } from './refreshtoken/refreshtoken.module';
import { JwtMiddleWare } from 'src/modules/auth/accesstoken/jwt.middleware';

@Module({
  imports: [LoginModule, RegisterModule, AccesstokenModule, RefreshtokenModule],
  exports: [LoginModule],
  providers: [],
  controllers: [],
})
export class AuthModule {}
