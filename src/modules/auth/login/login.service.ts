import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AccesstokenService } from '../accesstoken/accesstoken.service';

// import bcrypt from 'bcryptjs';
var bcrypt = require('bcryptjs')

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        private accessTokenService: AccesstokenService
    ) { }

    async login(email: string, password: string): Promise<{accessToken: string}> {
        const userAccount = await this.personRepository.findOneBy({ personName: email });

        if (!bcrypt.compare(email, userAccount.personPassword)) {
            return null
        }   

        let accessTokenObj = await this.accessTokenService.generate(userAccount)

        return {
            accessToken: accessTokenObj.jwtToken
        }
    }
}
