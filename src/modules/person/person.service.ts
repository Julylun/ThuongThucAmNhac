import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { PersonDataDto } from './dto/persondata.dto';
import { UserType } from './person.enum';

@Injectable()
export class PersonService {
    constructor(
        @InjectRepository(Person) //<----- BUG HERE
        private readonly personRepository: Repository<Person> //<----- BUG HERE
    ) { }
    private logger = new Logger(PersonService.name)

    async createPerson(personData: Partial<Person>): Promise<Person> {
        try {
            this.logger.debug("Creating person");
            let personInstance = this.personRepository.create(personData);
            personInstance = await this.personRepository.save(personInstance);
            this.logger.debug("Person created");
            return personInstance;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    personObjectToPersonDataDto(person: Person): PersonDataDto {
        return new PersonDataDto({
            personId: person.personId,
            personName: person.personName,
            personEmail: person.personEmail,
            personType: person.personType,
            personAvatar: person.personAvatar
        })
    }

    async getPerson(personId: number): Promise<Person> {
        try {
            this.logger.debug("Getting person by id");


            let personInstance = await this.personRepository.findOneBy({ personId: personId });
            
            if(personInstance == null) {
                throw new Error("Person not found");
            }
            this.logger.debug("Person found");
            this.logger.debug("Person data: " + personInstance);
            return personInstance;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getPersonsByName(personName: string): Promise<Person[]> {
        try {
            this.logger.debug("Getting persons by name");
            let personInstances = await this.personRepository.findBy({ personName: personName });

            this.logger.debug("Person found");
            this.logger.debug("Person data: " + personInstances);
            return personInstances;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async changeRole(person: Person, userType: UserType) {
        try {
            this.logger.debug("Changing role");

            person.personType = userType;
            return await this.personRepository.save(person);
            
        } catch (e) {
            console.log(e);
            return null;
        }
    }

}
