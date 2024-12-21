import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { Repository } from 'typeorm';
import { Person } from '../person/person.entity';
import { DeletePlaylistDto } from './dto/deletePlaylist.dto';
import { Song } from '../song/entity/song.entity';
import { PlaylistType } from './playlist.enum';

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

    async getPlaylist(playlistPartial: Partial<Playlist>): Promise<any> {
        try {
            let playlist = await this.playlistRepositoy.findOne({
                where: playlistPartial,
                relations: ['song','song.songArtist']
            });
            return playlist.song.map((song) => {
                return {
                    songId: song.songId,
                    songName: song.songName,
                    songImage: song.songImage,
                    songDuration: song.songDuration,
                    listenTimes: song.listenTimes,
                    songArtist: {
                        artistId: song.songArtist.personId,
                        artistName: song.songArtist.personName
                    }
                }
            });
        } catch (e) {
            this.logger.error('[getPlaylist]' + e.message);
            throw e;
        }
    }

    createPlayList(playlistName: string, person: Person, playlistType: PlaylistType): Playlist {
        const playlistObject = this.playlistRepositoy.create({
            playlistName: playlistName,
            person: person,
            playlistType: playlistType
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

    async removeSongsToPlaylist(playlistId: number, songs: Song[]): Promise<boolean> {
        try {
            this.logger.debug('[addSongsToPlaylist] Adding songs to playlist', songs);

            let playList = await this.playlistRepositoy.findOneBy({ playlistId: playlistId });
            this.logger.debug('[addSongsToPlaylist]: checkpoint 4');
            console.log(playList.song)

            if (!playList) throw new Error('Playlist not found');
            if (playList.song === undefined) {
                playList.song = [];
            }
            let songList = playList.song;
            for (let song of songs) {
                if (songList.find(s => s.songId === song.songId)) {
                    songList = songList.filter(s => s.songId !== song.songId);
                }
            }

            this.logger.debug('[addSongsToPlaylist]: checkpoint 5');
            await this.playlistRepositoy.save(playList);
            this.logger.debug('[addSongsToPlaylist]: checkpoint 6');
            return true;
        } catch (e) {
            return false
        }
    }

    async addSongsToPlaylist(playlistId: number, songs: Song[]): Promise<boolean> {
        try {
            this.logger.debug('[addSongsToPlaylist] Adding songs to playlist', songs);

            let playList = await this.playlistRepositoy.findOneBy({ playlistId: playlistId });
            this.logger.debug('[addSongsToPlaylist]: checkpoint 4');
            console.log(playList.song)

            if (!playList) throw new Error('Playlist not found');
            if (playList.song === undefined) {
                playList.song = [];
            }
            let songList = playList.song;
            for (let song of songs) {
                if (songList.find(s => s.songId === song.songId)) continue;
                songList.push(song);
            }

            this.logger.debug('[addSongsToPlaylist]: checkpoint 5');
            await this.playlistRepositoy.save(playList);
            this.logger.debug('[addSongsToPlaylist]: checkpoint 6');
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
