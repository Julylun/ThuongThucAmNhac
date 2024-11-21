import { ChildEntity, Entity, ManyToOne, OneToMany } from "typeorm";
import { Person } from "../person/person.entity";
import { Song } from "../song/song.entity";

@Entity('Person')
export class Artist extends Person {

    @OneToMany(type => Song, song => song.artist)
    createdSongs: Song[]
}