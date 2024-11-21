import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Song } from '../song/song.entity';
import { Artist } from '../artist/artist.entity';
import { Person } from '../person/person.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Playlist, Song, Artist, Person])],
  controllers: [PlaylistController],
  providers: [PlaylistService]
})
export class PlaylistModule {}
