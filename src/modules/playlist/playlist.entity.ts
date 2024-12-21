import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../person/person.entity";
import { Song } from "../song/entity/song.entity";
import { PlaylistType } from "./playlist.enum";


@Entity('Playlist')
export class Playlist {
    @PrimaryGeneratedColumn()
    playlistId: number

    @Column()
    playlistName: string


    @JoinColumn({ name: 'userId' })
    @ManyToOne(() => Person, (person) => person.playlists, { onDelete: 'CASCADE' })
    person: Person

    @Column({
        type: 'int',
        enum: PlaylistType,
        default: PlaylistType.USER
    })
    playlistType: PlaylistType

    @ManyToMany(() => Song, (song) => song.playlist, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable({
        name: 'Playlist_Song',
        joinColumns: [{
            name: 'playlistId',
            referencedColumnName: 'playlistId'
        }],
        inverseJoinColumns: [{
            name: 'songId',
            referencedColumnName: 'songId'
        }]
    })
    // @JoinTable()
    song: Song[]
}