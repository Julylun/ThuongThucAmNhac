import { forwardRef, Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { Song } from './entity/song.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesstokenModule } from '../auth/accesstoken/accesstoken.module';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song]),
    forwardRef(() => AccesstokenModule),
    forwardRef(() => PersonModule)
  ],
  controllers: [SongController],
  providers: [SongService],
  exports: [TypeOrmModule]
})
export class SongModule { }
