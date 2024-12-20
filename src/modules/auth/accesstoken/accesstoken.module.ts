import { forwardRef, Module } from '@nestjs/common';
import { AccesstokenService } from './accesstoken.service';
import { AccesstokenController } from './accesstoken.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from './accesstoken.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT_KEY } from 'src/common/constant/jwt.constant';
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { PersonModule } from 'src/modules/person/person.module';
import { RefreshtokenModule } from '../refreshtoken/refreshtoken.module';
import { PersonService } from 'src/modules/person/person.service';
import { JwtMiddleWare } from 'src/modules/auth/accesstoken/jwt.middleware';

@Module({
  imports:[
    TypeOrmModule.forFeature([AccessToken]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT_KEY, 
      signOptions: { expiresIn: '36000s'}
    }),
    forwardRef(() => PersonModule),
    forwardRef(() => RefreshtokenModule)
  ],
  providers: [AccesstokenService,RefreshTokenService,PersonService],
  controllers: [AccesstokenController],
  exports: [TypeOrmModule, AccesstokenService]
})
export class AccesstokenModule {}
