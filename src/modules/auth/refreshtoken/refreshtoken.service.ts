import { Injectable, Logger } from '@nestjs/common';
import { RefreshToken } from './entity/refreshtoken.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Person } from 'src/modules/person/person.entity';



@Injectable()
export class RefreshTokenService {
    constructor(
        @InjectRepository(RefreshToken)
        private accessTokenRepository: Repository<RefreshToken>,
        private jwtService: JwtService,
    ) { }


    private logger = new Logger(RefreshTokenService.name)


    generate(person: Person): RefreshToken {
        try {
            const payload = { sub: person.personId, username: person.personName }
            let jwtToken = this.jwtService.sign(payload)
            let accessTokenObj = this.accessTokenRepository.create({
                jwtString: jwtToken,
                person: person
            })

            if (!accessTokenObj) throw new Error("The accessTokenObj is null. Generate access token is failed.")
            this.accessTokenRepository.save(accessTokenObj)
            return accessTokenObj
        } catch (e) {
            Logger.error(e.message)
            return null
        }

    }

    parseToId(jwtString: string): number {
        try {
            let jwtDecoded = this.jwtService.verify(jwtString) as { sub: number, username: string, iat: number, exp: number }
            this.logger.debug("Decoded (below) ")
            this.logger.debug(jwtDecoded)

            if(!jwtDecoded) throw new Error("JWT is invalid")


            return jwtDecoded.sub
        } catch(error) {
            this.logger.debug(error.message)
            return -1
        }
    }

    async findLast(person: Person): Promise<RefreshToken> {
        return await this.accessTokenRepository.findOneBy({ person: person })
    }

    async findAll(person: Person): Promise<RefreshToken[]> {
        return await this.accessTokenRepository.findBy({ person: person })
    }
}

