import {  forwardRef, Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PersonModule } from '../person/person.module';
import { SongModule } from '../song/song.module';
import { AccesstokenModule } from '../auth/accesstoken/accesstoken.module';
import { AccesstokenService } from '../auth/accesstoken/accesstoken.service';
import { PersonService } from '../person/person.service';
import { SongService } from '../song/song.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    forwardRef(() => PersonModule) ,
    SongModule,
    forwardRef(() => AccesstokenModule)
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService, AccesstokenService, PersonService, SongService],
  exports: [TypeOrmModule]
})
export class PlaylistModule { }
