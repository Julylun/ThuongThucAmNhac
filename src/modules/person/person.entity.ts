import { Column, Entity, IntegerType, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { UserType } from './person.enum';

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

    //TODO: Create find, findAll, create, update, delete methods
}