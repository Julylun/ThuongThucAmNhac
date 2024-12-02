import { UserType } from "../person.enum";

export class PersonDataDto {
    personId: number;
    personName: string;
    personEmail: string;
    personType: UserType;
    personAvatar: string;
    constructor(personData: Partial<PersonDataDto>) {
        this.personId = personData.personId;
        this.personName = personData.personName;
        this.personEmail = personData.personEmail;
        this.personType = personData.personType;
        this.personAvatar = personData.personAvatar;
    }   
}