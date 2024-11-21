import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from './accesstoken.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/modules/person/person.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccesstokenService {
    constructor(
        @InjectRepository(AccessToken)
        private accessTokenRepository: Repository<AccessToken>,
        private jwtService: JwtService,
    ) { }


    private logger = new Logger(AccessToken.name)


    async generate(person: Person): Promise<AccessToken> {
        try {
            const payload = { sub: person.personId, username: person.personName }
            let jwtToken = await this.jwtService.signAsync(payload)
            let accessTokenObj = this.accessTokenRepository.create({
                jwtToken: jwtToken,
                person: person
            })

            if(!accessTokenObj) throw new Error("The accessTokenObj is null. Generate access token is failed.")
            this.accessTokenRepository.save(accessTokenObj)
            return accessTokenObj
        } catch(e) {
            Logger.error(e.message)
            return null
        }

    }
    async findLast(person: Person): Promise<AccessToken> {
        return await this.accessTokenRepository.findOneBy({ person: person })
    }

    async findAll(person: Person): Promise<AccessToken[]> {
        return await this.accessTokenRepository.findBy({ person: person })
    }
}
