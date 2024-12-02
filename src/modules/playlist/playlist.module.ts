import {  forwardRef, Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { PersonModule } from '../person/person.module';
import { SongModule } from '../song/song.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    forwardRef(() => PersonModule) ,
    SongModule
  ],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [TypeOrmModule]
})
export class PlaylistModule { }
