import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { AccesstokenModule } from '../accesstoken/accesstoken.module';
import { RefreshtokenModule } from '../refreshtoken/refreshtoken.module';
import { PersonModule } from 'src/modules/person/person.module';
import { AccesstokenService } from '../accesstoken/accesstoken.service';
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';

@Module({
  imports: [
    AccesstokenModule,
    RefreshtokenModule,
    PersonModule
  ],
  controllers: [LoginController],
  providers: [LoginService,AccesstokenService,RefreshTokenService],
  exports: [LoginModule]
})
export class LoginModule { }
