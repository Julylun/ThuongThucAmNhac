import { ApiProperty } from "@nestjs/swagger";
import { Person } from "../person.entity";
import { UserType } from "../person.enum";

export class PersonResponseDto {
    @ApiProperty({example: 123, description: 'Id of user'})
    personId: number;

    @ApiProperty({example: "LeeLy2802", description: 'Username of user'})
    personName: string;

    @ApiProperty({example: "nguyenthily2005@example.com", description: 'Email of userA'})
    personEmail: string;

    @ApiProperty({example: "1", description: 'Decide what user role is, for example admin/artist/user'})
    personType: UserType;

    @ApiProperty({example: "jiovcxzd18-12-24.png", description: 'Avatar path of user'})
    personAvatar: string;

    constructor(personData: Partial<PersonResponseDto>) {
        this.personId = personData.personId;
        this.personName = personData.personName;
        this.personEmail = personData.personEmail;
        this.personType = personData.personType;
        this.personAvatar = personData.personAvatar
    }   

    static from(person: Person): PersonResponseDto {
        return new PersonResponseDto({
            personId: person.personId,
            personName: person.personName,
            personEmail: person.personEmail,
            personType: person.personType,
            personAvatar: person.personAvatar
        })
    }

}