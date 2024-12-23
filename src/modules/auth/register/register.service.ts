import { Injectable, Logger } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { Person } from 'src/modules/person/person.entity';
import { UserStatus, UserType } from 'src/modules/person/person.enum';
import { PersonService } from 'src/modules/person/person.service';
import { OtpCodeService } from '../otp-code/otp-code.service';
var bcrypt = require('bcryptjs')

@Injectable()
export class RegisterService {
    constructor(
        private readonly personService: PersonService,
        private readonly otpCodeService: OtpCodeService
    ) { }

    private readonly log = new Logger(RegisterService.name)

    async confirmUser(personId) {
        try {
            let userAccount = await this.personService.getPerson(personId);
            userAccount.personStatus = UserStatus.Alived;
            await this.personService.savePerson(userAccount);
        } catch(error) {
            this.log.log('[confirmUser]: An error occured while getting person');
            throw error;
        }
    }


    async register(registerDto: RegisterDto) {
        const saltRound = 10;
        let encryptedPassword = await bcrypt.hash(
            registerDto.userPassword,
            saltRound
        );
        Logger.debug('-x-x->> Register Information <<-x-x-');
        Logger.debug('Email -> ', registerDto.userEmail);
        Logger.debug('Username -> ', registerDto.username);
        Logger.debug('Generated encrypted password -> ', encryptedPassword);
        let person = await this.createPerson({
            personName: registerDto.username,
            personEmail: registerDto.userEmail,
            personPassword: encryptedPassword,
            personType: UserType.User,
            personStatus: UserStatus.Waiting
        });

        return person;
    }

    async createPerson(personData: Partial<Person>): Promise<Person> {
        return await this.personService.createPerson(personData);
    }
}
