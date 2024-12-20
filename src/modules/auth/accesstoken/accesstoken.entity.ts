import { Person } from "src/modules/person/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('AccessToken')
export class AccessToken {
    @PrimaryGeneratedColumn()
    tokenId: number

    @Column()
    jwtToken: string

    @ManyToOne((personId) => Person, (person) => person.accessTokens, { onDelete: 'CASCADE'})
    @JoinColumn({name: 'personId'})
    person: Person
}