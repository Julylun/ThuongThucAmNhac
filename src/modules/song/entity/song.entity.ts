import { Column, Entity, JoinColumn, ManyToMany, ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Artist } from "../../artist/artist.entity";
import { Playlist } from "../../playlist/playlist.entity";
import { Person } from "src/modules/person/person.entity";


@Entity('Song')
export class Song {

    @PrimaryGeneratedColumn()
    songId: number;

    @Column()
    songName: string;

    @Column()
    songPath: string;

    @Column()
    songImage: string;

    @Column({ default: 0 })
    listenTimes: number

    @Column()
    songDuration: number

    @ManyToOne(() => Person, (person) => person.createdSongs, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'songArtist' })
    songArtist: Person;

    @ManyToMany(() => Playlist, (playlist) => playlist.songs)
    playlists: Playlist[]
}