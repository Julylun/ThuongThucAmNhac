import { Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { Repository } from 'typeorm';
import { targetModulesByContainer } from '@nestjs/core/router/router-module';
var bcrypt = require('bcryptjs')

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>
    ) { }

    private readonly log = new Logger(RegisterService.name)

    async register(registerDto: RegisterDto) {
        const saltRound = 10;
        let encryptedPassword = await bcrypt.hash(
            registerDto.userPassword,
            saltRound
        );
        Logger.debug('-x-x->> Register Information <<-x-x-');
        Logger.debug('Email -> ', registerDto.userEmail);
        Logger.debug('Username -> ', registerDto.username);
        Logger.debug('Generated encrypted password -> ',encryptedPassword);
        return await this.createPerson({
            personName: registerDto.username,
            personEmail: registerDto.userEmail,
            personPassword: encryptedPassword
        });
    }

    async createPerson(personData: Partial<Person>): Promise<Person> {
        const person = this.personRepository.create(personData);
        return await this.personRepository.save(person);
    }
}
