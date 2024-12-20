import { Person } from "src/modules/person/person.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity('RefreshToken')
export class RefreshToken{
    @PrimaryGeneratedColumn()
    tokenId: number

    @Column()
    jwtString: string

    @ManyToOne(() => Person, (person) => person.accessTokens, { onDelete: 'CASCADE'})
    @JoinColumn({name:'personId'})
    person: Person
}