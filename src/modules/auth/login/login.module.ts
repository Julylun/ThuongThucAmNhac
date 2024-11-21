import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { AccesstokenModule } from '../accesstoken/accesstoken.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    AccesstokenModule
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule { }
