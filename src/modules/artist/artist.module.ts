import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../person/person.entity';
import { Artist } from './artist.entity';
import { Song } from '../song/song.entity';
import { Playlist } from '../playlist/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person,Artist,Song,Playlist])
  ],
  providers: [ArtistService],
  controllers: [ArtistController]
})
export class ArtistModule {}
