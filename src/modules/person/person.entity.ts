import { Column, Entity, IntegerType, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { UserType } from './person.enum';
import { AccessToken } from '../auth/accesstoken/accesstoken.entity';
import { Playlist } from '../playlist/playlist.entity';
import { plainToClass } from 'class-transformer';

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
    personPassword: string;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.User
    })
    personType: UserType

    @OneToMany(type => AccessToken, accessToken => accessToken.person)
    accessTokens: AccessToken[];

    @OneToMany(type => Playlist, playlist => playlist.person)
    playlists: Playlist[];

    //TODO: Create find, findAll, create, update, delete methods
}