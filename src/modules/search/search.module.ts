import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { PersonModule } from '../person/person.module';
import { SongModule } from '../song/song.module';
import { PlaylistModule } from '../playlist/playlist.module';

@Module({
  imports: [
    PersonModule,
    SongModule,
    PlaylistModule
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
