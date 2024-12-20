import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { Repository } from 'typeorm';
import { PersonResponseDto } from './dto/personResponse.dto';
import { UserStatus, UserType } from './person.enum';
import { CreatePersonDto } from './dto/createPerson.dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';

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

    /**
     * Transfer person instance into Person Dto instance
     * @param person 
     * @param dtoName 
     * @returns PersonResponseDto | CreatePersonDto | UpdatePersonDto
     * @throws {Error("Wrong Dto type")}: Throw when dtoName is wrong
     * @throws
     */
    personToPersonDto(person: Person, dtoName: string): PersonResponseDto | CreatePersonDto | UpdatePersonDto {
        try {
            if(!person) throw new Error("Person is null");
            switch (dtoName) {
                case PersonResponseDto.name: {
                    return PersonResponseDto.from(person);
                }
                case CreatePersonDto.name: {
                    return CreatePersonDto.from(person)
                }
                case UpdatePersonDto.name: {
                    return UpdatePersonDto.from(person);
                }
                default: {
                    throw new Error("Wrong DTO type");
                }
            }
        } catch (error) {
            this.logger.error('[personToPersonDto]: An error occus');
            this.logger.error(error);
            throw error;
        }
    }

    async getPerson(personId: number): Promise<Person> {
        try {
            this.logger.debug("Getting person by id");


            let personInstance = await this.personRepository.findOneBy({ personId: personId });

            if (personInstance == null) {
                throw new Error("Person not found");
            }
            this.logger.debug("Person found");
            this.logger.debug("Person data: " + personInstance);
            return personInstance;
        } catch (e) {
            this.logger.error('[getPerson]: An error occurs.');
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

    async changeStatus(person: Person, userStatus: UserStatus) {
        try {
            this.logger.debug("Changing user status");

            person.personStatus = userStatus;
            return await this.personRepository.save(person);
        } catch (e) {
            console.log(e);
            return null;
        }

    }
}
