import { Injectable, Logger } from '@nestjs/common';
import { Song } from './entity/song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';
import * as MusicMetadata from 'music-metadata';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(Song)
        private songRepository: Repository<Song>
    ) { }
    private logger = new Logger(SongService.name)

    async createSong(songName: string, songPath: string, imagePath, songDuration: number, songArtist: Person, songListenTimes: number): Promise<Song> {
        try {
            let song = this.songRepository.create(
                {
                    songName: songName,
                    songPath: songPath,
                    songImage: imagePath,
                    listenTimes: songListenTimes,
                    songArtist: songArtist,
                    songDuration: songDuration
                }
            )
            return await this.songRepository.save(song)
        } catch (e) {
            return null
        }
    }

    async getSongsByListenTime(): Promise<Song[]> {
        return await this.songRepository.find({
            take: 24,
            order: {
                listenTimes: "DESC"
            },
            relations: ['songArtist']
        })
    }

    async getSongDuration(filePath: string): Promise<number> {
        try {
            let metadata = await MusicMetadata.parseFile(filePath)
            return metadata.format.duration
        } catch (e) {
            this.logger.error(e)
            return null
        }
    }

    async getSongById(songId: number): Promise<Song> {
        try {
            let song = await this.songRepository.findOneBy({ songId: songId });
            return song;
        }
        catch (e) {
            this.logger.error(e.message);
            return null;
        }
    }
}

