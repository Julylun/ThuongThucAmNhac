import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm'
import { UserType } from './person.enum';
import { AccessToken } from '../auth/accesstoken/accesstoken.entity';
import { Playlist } from '../playlist/playlist.entity';
import { RefreshToken } from '../auth/refreshtoken/entity/refreshtoken.entity';
import { Song } from '../song/entity/song.entity';


export interface PersonParams {
    personId: number;
    personName: string;
    personEmail: string;
    personType: UserType
}
@Entity('Person')
export class Person {
    @PrimaryGeneratedColumn()
    personId: number;

    @Column()
    personName: string;

    @Unique(['personEmail'])
    @Column()
    personEmail: string;

    @Column()
    personAvatar: string;

    @Column()
    personPassword: string;

    @Column({
        type: 'int',
        enum: UserType,
        default: UserType.User
    })
    personType: UserType

    @OneToMany(type => AccessToken, accessToken => accessToken.person)
    accessTokens: AccessToken[];

    @OneToMany(type => RefreshToken, refreshToken => refreshToken.person)
    refreshToken: RefreshToken[];

    @OneToMany(type => Playlist, playlist => playlist.person)
    playlists: Playlist[];


    @OneToMany(() => Song, (song) => song.songArtist)   
    createdSongs: Song[]


}

// export default Person;