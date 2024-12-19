import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';
import { DeletePlaylistDto } from './dto/deletePlaylist.dto';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepositoy: Repository<Playlist>
    ) { }

    createPlayList(playlistName: string, person: Person): Playlist {
        const playlistObject = this.playlistRepositoy.create({
            playlistName: playlistName,
            person: person
        })
        this.playlistRepositoy.save(playlistObject)
        return playlistObject
    }

    /**
     * Delete a playlist by using playlist id
     * @param playlistId
     * @returns {boolean} - True means the playlist is being deleted, false reversing
     */
    async deletePlaylist(playlistId: number): Promise<boolean> {
        let numberOfAffectedRows = (await this.playlistRepositoy.delete({playlistId: playlistId})).affected;
        if(numberOfAffectedRows > 0) return true;
        return false;
    }

    isOwnedBy(playlistId: number, userId: number): boolean {
        let resultPlaylist = this.playlistRepositoy.findOneBy({playlistId: playlistId, person: {personId: userId}});
        if(resultPlaylist) return true;
        return false;
    }
}
