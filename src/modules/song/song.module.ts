import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/person.entity';
import { Artist } from '../artist/artist.entity';
import { Playlist } from '../playlist/playlist.entity';
import { Song } from './song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person,Artist,Playlist,Song])
  ],
  controllers: [SongController],
  providers: [SongService]
})
export class SongModule {}
