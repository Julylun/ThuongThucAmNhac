import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Song } from '../song/song.entity';
import { Playlist } from '../playlist/playlist.entity';
import { Artist } from '../artist/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Song,Playlist,Artist])
  ],
  controllers: [PersonController],
  providers: [PersonService]
})
export class PersonModule {}
