import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

// import bcrypt from 'bcryptjs';
var bcrypt = require('bcryptjs')

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string): Promise<{accessToken: string}> {
        const userAccount = await this.personRepository.findOneBy({ personName: email });
        if (!bcrypt.compare(email, userAccount.personPassword)) {
            return null
        }

        const payload = {sub: userAccount.personId, username: userAccount.personName}
        return {
            accessToken: await this.jwtService.signAsync(payload)
        }
        
    }
}
