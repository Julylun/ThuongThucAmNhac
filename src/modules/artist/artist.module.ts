import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  providers: [],
  controllers: [],
  exports: []
})
export class ArtistModule {}
