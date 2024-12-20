import { ApiProperty } from "@nestjs/swagger";
import { Person } from "src/modules/person/person.entity";
import { UserType } from "src/modules/person/person.enum";



export class UnsuccessfullPersonResponseDto {
    @ApiProperty({example: null, description: 'Id of user'})
    personId: number;

    @ApiProperty({example: null, description: 'Username of user'})
    personName: string;

    @ApiProperty({example: null, description: 'Email of userA'})
    personEmail: string;

    @ApiProperty({example: null, description: 'Decide what user role is, for example admin/artist/user'})
    personType: UserType;

    @ApiProperty({example: null, description: 'Avatar path of user'})
    personAvatar: string;

}