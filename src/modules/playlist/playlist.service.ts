import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';
import { DeletePlaylistDto } from './dto/deletePlaylist.dto';
import { Song } from '../song/entity/song.entity';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepositoy: Repository<Playlist>
    ) { }
    private readonly logger: Logger = new Logger(PlaylistService.name);

    async getPlaylistByUser(userPartial: Partial<Person>): Promise<Playlist[]> {
        try {
            let userPlaylists = (await this.playlistRepositoy.findBy({ person: userPartial }))
            return userPlaylists;
        } catch (e) {
            this.logger.error('[getPlaylist]' + e.message);
            throw e;
        }
    }

    async getPlaylist(playlistPartial: Partial<Playlist>): Promise<Playlist> {
        try {
            let playlist = await this.playlistRepositoy.findOneBy(playlistPartial);
            return playlist;
        } catch (e) {
            this.logger.error('[getPlaylist]' + e.message);
            throw e;
        }
    }

    createPlayList(playlistName: string, person: Person): Playlist {
        const playlistObject = this.playlistRepositoy.create({
            playlistName: playlistName,
            person: person
        })
        this.playlistRepositoy.save(playlistObject)
        return playlistObject
    }


    async modifyPlaylist(songId: number, entityPartital: Partial<Playlist>): Promise<boolean> {
        let affectedRows = (await this.playlistRepositoy.update(songId, entityPartital)).affected;
        if (affectedRows > 0) return true;
        return false;
    }
    /**
     * Delete a playlist by using playlist id
     * @param playlistId
     * @returns {boolean} - True means the playlist is being deleted, false reversing
     */
    async deletePlaylist(playlistId: number): Promise<boolean> {
        let numberOfAffectedRows = (await this.playlistRepositoy.delete({ playlistId: playlistId })).affected;
        if (numberOfAffectedRows > 0) return true;
        return false;
    }

    async addSongsToPlaylist(playlistId: number, songs: Song[]): Promise<boolean> {
        try {
            let playList = await this.playlistRepositoy.findOneBy({ playlistId: playlistId });
            songs.forEach((song) => {
                playList.songs.push(song)
            })
            this.playlistRepositoy.save(playList)
            return true;
        } catch (e) {
            return false
        }
    }

    async isOwnedBy(playlistId: number, userId: number): Promise<boolean> {
        let resultPlaylist = await this.playlistRepositoy.findOneBy({ playlistId: playlistId, person: { personId: userId } });
        if (resultPlaylist) return true;
        return false;
    }

    isPlaylistExist(playlistId: number): Promise<boolean> {
        return this.playlistRepositoy.existsBy({ playlistId: playlistId });
    }
}
