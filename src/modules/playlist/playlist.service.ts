import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';
import { retry } from 'rxjs';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepositoy: Repository<Playlist>
    ) { }

    create(playlistName: string, person: Person): Playlist {
        const playlistObject = this.playlistRepositoy.create({
            playlistName: playlistName,
            person: person
        })
        this.playlistRepositoy.save(playlistObject)
        return playlistObject
    }
}
