import { Person } from "src/modules/person/person.entity";
import { Song } from "../entity/song.entity";
import { Logger } from "@nestjs/common";
import { log } from "console";

export class SongInfoDto {
    songId: number;
    songName: string;
    songImage: string;
    songDuration: number;
    listenTimes: number;
    artistId: number;
    artistName: string;
    songArtist: {
        artistId: number,
        artistName: string,
    };
    constructor(data: Partial<SongInfoDto>) {
        Object.assign(this, data);
    }

}

export function SongToInfoDto(song: Song): SongInfoDto {
    let logger = new Logger(SongToInfoDto.name);
    let artist = song.songArtist;
    logger.debug('artist -> ' + artist);
    let songInfoDto = new SongInfoDto({
        songId: song.songId,
        songName: song.songName,
        songImage: song.songImage,
        songDuration: song.songDuration,
        listenTimes: song.listenTimes,
        songArtist: {
            artistId:  artist.personId,
            artistName: artist.personName
        }
    })
    
    logger.debug(songInfoDto);
    return songInfoDto
}

export function songsToSongInfoDtos(songs: Song[]): SongInfoDto[] {
    let songInfoDtoArray = new Array<SongInfoDto>(songs.length);

    for (let i = 0; i < songs.length; i++) {
        songInfoDtoArray[i] = SongToInfoDto(songs[i]);
    }

    return songInfoDtoArray;
}