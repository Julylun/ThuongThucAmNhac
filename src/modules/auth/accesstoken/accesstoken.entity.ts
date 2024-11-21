import { Person } from "src/modules/person/person.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('AccessToken')
export class AccessToken {
    @PrimaryGeneratedColumn()
    tokenId: number

    @Column()
    jwtToken: string

    @ManyToOne(() => Person, (person) => person.accessTokens, { onDelete: 'CASCADE'})
    person: Person
}