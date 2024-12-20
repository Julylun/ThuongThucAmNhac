import { forwardRef, Module } from '@nestjs/common';
import { RefreshtokenController } from './refreshtoken.controller';
import { RefreshTokenService } from './refreshtoken.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshToken } from './entity/refreshtoken.entity';
import { Person } from 'src/modules/person/person.entity';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT_KEY } from 'src/common/constant/jwt.constant';
import { AccesstokenModule } from '../accesstoken/accesstoken.module';
import { PersonModule } from 'src/modules/person/person.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT_KEY, 
      signOptions: { expiresIn: '1296000s'}
    }),
    forwardRef(() => PersonModule),
    forwardRef(() => AccesstokenModule)
  ],
  controllers: [RefreshtokenController],
  providers: [RefreshTokenService],
  exports: [TypeOrmModule]
})
export class RefreshtokenModule {}
