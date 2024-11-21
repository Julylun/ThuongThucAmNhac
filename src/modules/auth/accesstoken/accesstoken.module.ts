import { Module } from '@nestjs/common';
import { AccesstokenService } from './accesstoken.service';
import { AccesstokenController } from './accesstoken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './accesstoken.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT_KEY } from 'src/common/constant/jwt.constant';
import { Person } from 'src/modules/person/person.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AccessToken, Person]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT_KEY, 
      signOptions: { expiresIn: '36000s'}
    })
  ],
  providers: [AccesstokenService],
  controllers: [AccesstokenController],
  exports: [AccesstokenService]
})
export class AccesstokenModule {}
