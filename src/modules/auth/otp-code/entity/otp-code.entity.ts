import { Person } from "src/modules/person/person.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('OtpCode')
export class OtpCode {
    @PrimaryGeneratedColumn()
    otpCodeId: number;

    @ManyToOne(() => Person, (person) => person.otpCode, { onDelete: 'CASCADE'})
    @JoinColumn({name: 'personId'})
    person: Person;

    @Column()
    otpCodeToken: string
}