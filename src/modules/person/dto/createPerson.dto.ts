import { ApiProperty } from '@nestjs/swagger';
import * as ClassValidator from 'class-validator'
import { Person } from '../person.entity';


export class CreatePersonDto {
    @ApiProperty({example: 'nguyenthily2005@example.com', description: 'User email'})
    @ClassValidator.IsEmail()
    userEmail: string;

    @ApiProperty({example: 'LeeLy2802', description: 'User name'})
    @ClassValidator.IsNotEmpty()
    username: string;

    @ApiProperty({example: 'leelyyyyy', description: 'User password'})
    @ClassValidator.IsNotEmpty()
    userPassword: string

    constructor(userEmail: string, username: string, userPassword: string){
        this.userEmail = userEmail;
        this.username = username;
        this.userPassword = userPassword;
    }

    static from(person: Person): CreatePersonDto {
        return new CreatePersonDto(person.personEmail, person.personName, person.personPassword);
    }
}