import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/modules/person/person.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AccesstokenService } from '../accesstoken/accesstoken.service';
import { RefreshToken } from '../refreshtoken/entity/refreshtoken.entity';
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';

// import bcrypt from 'bcryptjs';
var bcrypt = require('bcryptjs')

@Injectable()
export class LoginService {
    constructor(
        @InjectRepository(Person)
        private personRepository: Repository<Person>,
        private accessTokenService: AccesstokenService,
        private refreshTokenService: RefreshTokenService
    ) { }
    private logger = new Logger(LoginService.name)

    async login(email: string, password: string): Promise<ResponseData<{ accessToken: string, refreshToken: string }>> {
        try {
            this.logger.debug('[login]: ',email + ' | ' + password)
            const userAccount = await this.personRepository.findOneBy({ personEmail: email });

            this.logger.debug(userAccount);

            if (!bcrypt.compare(password, userAccount.personPassword)) {
                return null;
            }

            this.logger.debug("Password is correct");

            this.logger.debug("Generating access token");
            let accessTokenObj = this.accessTokenService.generate(userAccount);

            this.logger.debug("Generating refresh token");
            let refreshTokenObj = this.refreshTokenService.generate(userAccount);



            this.logger.debug("Login complete");
            return new ResponseData({
                data: { accessToken: accessTokenObj.jwtToken, refreshToken: refreshTokenObj.jwtString, },
                statusCode: HttpCode.OK,
                message: HttpMessage.OK
            });

        } catch (e) {
            this.logger.debug("Error!!!!!!!!!!!!!!!!!!!!!");
            this.logger.error(e.message);
            return new ResponseData({
                data: null,
                statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                message: HttpMessage.INTERNAL_SERVER_ERROR
            });
        }
    }
}
