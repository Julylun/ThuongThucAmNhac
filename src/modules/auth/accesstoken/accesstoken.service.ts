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


    private logger = new Logger(AccesstokenService.name)


    generate(person: Person): AccessToken {
        try {
            const payload = { sub: person.personId, username: person.personName }
            let jwtToken = this.jwtService.sign(payload)
            let accessTokenObj = this.accessTokenRepository.create({
                jwtToken: jwtToken,
                person: person
            })

            if (!accessTokenObj) throw new Error("The accessTokenObj is null. Generate access token is failed.")
            this.accessTokenRepository.save(accessTokenObj)
            return accessTokenObj
        } catch (e) {
            this.logger.error(e.message)
            return null
        }
    }

    decode(jwtToken: string): any {
        return this.jwtService.decode(jwtToken)
    }

    verify(jwtToken: string): any {
        try {
            this.jwtService.verify(jwtToken)
        } catch (e) {
            this.logger.error(e.message)
            throw new Error("The jwtToken is invalid")
        }
    }

    /**
     * decode and verify access token.
     * @param jwtToken 
     * @returns number (userId if access token is valid)
     * @returns number (-404 if access token is expired or invalid)
     */
    decodeToUserId(jwtToken: string): number {
        try {
            let decodedToken = this.jwtService.verify(jwtToken)
            this.logger.debug("Decoded token: ",decodedToken)
            if (decodedToken == null || decodedToken.sub == null) return -404
            return decodedToken.sub
        } catch (e) {
            this.logger.error(e)
            if(e.message == "The jwtToken is invalid") return -404
            return -500
        }
    }

    async findLast(person: Person): Promise<AccessToken> {
        return await this.accessTokenRepository.findOneBy({ person: person })
    }

    async findAll(person: Person): Promise<AccessToken[]> {
        return await this.accessTokenRepository.findBy({ person: person })
    }
}
