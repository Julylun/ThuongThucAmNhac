import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT_KEY, JWT_CONSTANT_TIME } from 'src/common/constant/jwt.constant';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT_KEY, 
      signOptions: { expiresIn: '36000s'}
    })
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
