import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../person/person.entity";
import { Song } from "../song/song.entity";


@Entity('Playlist')
export class Playlist {
    @PrimaryGeneratedColumn()
    playlistId: number

    @Column()
    playlistName: string

    @ManyToOne(() => Person, (person) => person.playlists, { onDelete: 'CASCADE' })
    person: Person

    @ManyToMany(() => Song, (song) => song.playlists, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinTable({name: 'Playlist_Song'})
    songs: Song[]
}