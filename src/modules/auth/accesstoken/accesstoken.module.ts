import { Module } from '@nestjs/common';
import { AccesstokenService } from './accesstoken.service';
import { AccesstokenController } from './accesstoken.controller';

@Module({
  providers: [AccesstokenService],
  controllers: [AccesstokenController]
})
export class AccesstokenModule {}
