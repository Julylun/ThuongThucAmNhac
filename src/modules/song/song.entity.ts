import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "../artist/artist.entity";
import { Playlist } from "../playlist/playlist.entity";


@Entity('Song')
export class Song {

    @PrimaryGeneratedColumn()
    songId: number;

    @Column()
    songName: string;

    @Column()
    songPath: string

    @Column({ default: 0 })
    listenTimes: number

    @ManyToOne(() => Artist, (artist) => artist.createdSongs, { onDelete: 'CASCADE' })
    artist: Artist;

    @ManyToMany(() => Playlist, (playlist) => playlist.songs)
    playlists: Playlist[]
}