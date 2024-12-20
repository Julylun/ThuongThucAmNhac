import { ApiProperty } from "@nestjs/swagger";
import * as ClassValidator from 'class-validator'
import { Person } from "../person.entity";

export class UpdatePersonDto {
    @ApiProperty({example: 'julylun', description: 'User name'})
    username: string;

    @ApiProperty({example: 'HoangLuanDeptraivai', description: 'User password'})
    userPassword: string

    constructor(username: string, userPassword: string) {
        this.username = username;
        this.userPassword = userPassword;
    }

    static from(person: Person): UpdatePersonDto {
        return new UpdatePersonDto(person.personName, person.personPassword);
    }

}