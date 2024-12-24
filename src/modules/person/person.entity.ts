import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance, Unique } from 'typeorm'
import { UserStatus, UserType } from './person.enum';
import { AccessToken } from '../auth/accesstoken/accesstoken.entity';
import { Playlist } from '../playlist/playlist.entity';
import { RefreshToken } from '../auth/refreshtoken/entity/refreshtoken.entity';
import { Song } from '../song/entity/song.entity';
import { OtpCode } from '../auth/otp-code/entity/otp-code.entity';


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
        enum: UserStatus,
        default: UserStatus.Waiting
    })
    personStatus: number

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

    @OneToMany(() => OtpCode, (otpCode) => otpCode.person)
    otpCode: OtpCode[]
}

// export default Person;