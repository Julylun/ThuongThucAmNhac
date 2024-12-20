import { forwardRef, Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PlaylistModule } from '../playlist/playlist.module';
import { RefreshtokenModule } from '../auth/refreshtoken/refreshtoken.module';
import { AccesstokenModule } from '../auth/accesstoken/accesstoken.module';
import { AccesstokenService } from '../auth/accesstoken/accesstoken.service';
import { HashModule } from '../auth/hash/hash.module';
import { HashService } from '../auth/hash/hash.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    forwardRef(() => RefreshtokenModule),
    forwardRef(() => AccesstokenModule),
    forwardRef(() => PlaylistModule),
    HashModule
  ],
  controllers: [PersonController],
  providers: [PersonService, AccesstokenService, HashService],
  exports: [TypeOrmModule, PersonService]
})
export class PersonModule {}
