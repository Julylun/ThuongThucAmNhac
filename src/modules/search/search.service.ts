import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../person/person.entity';
import { Like, Repository } from 'typeorm';
import { Song } from '../song/entity/song.entity';
import { Playlist } from '../playlist/playlist.entity';
import { PlaylistType } from '../playlist/playlist.enum';
import { UserType } from '../person/person.enum';

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(Person) private readonly personRepository: Repository<Person>,
        @InjectRepository(Song) private readonly songRepository: Repository<Song>,
        @InjectRepository(Playlist) private readonly playlistRepository: Repository<Playlist>
    ) { }

    private readonly logger: Logger = new Logger(SearchService.name)


    async getSimilarData(keyWord: string, currentPage: number, limitItems: number) {
        try {
            this.logger.debug('[getSimilarData]: Getting similar data')
            let personResult = null;
            let songResult = null;
            let playlistResult = null;



            personResult = await this.personRepository.find({
                where: {
                    personName: Like('%' + keyWord + '%'),
                    personType: UserType.Artist
                },
                skip: (currentPage - 1) * limitItems,
                take: limitItems
            })
            this.logger.debug('[getSimilarData]: Checkpoint 1: person');


            songResult = await this.songRepository.find({
                where: {
                    songName: Like('%' + keyWord + '%')
                },
                skip: (currentPage - 1) * limitItems,
                take: limitItems
            })

            this.logger.debug('[getSimilarData]: Checkpoint 2: song');

            playlistResult = await this.playlistRepository.find({
                where: {
                    playlistName: Like('%' + keyWord + '%'),
                    playlistType: PlaylistType.ALBUM
                },
                skip: (currentPage - 1) * limitItems,
                take: limitItems
            })

            this.logger.debug('[getSimilarData]: Checkpoint 3: playlist');

            console.log(personResult);

            console.log(songResult);

            console.log(playlistResult);

            return null;

        } catch (error) {
            this.logger.error('[getSimilarData]: Some errors occured while getting similar data.')
            this.logger.error(error)
            return null;
        }


    }
}
