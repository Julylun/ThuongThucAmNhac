import { Body, Controller, Logger, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { AccesstokenService } from './accesstoken.service';
import { RefreshToken } from '../refreshtoken/entity/refreshtoken.entity';
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { PersonService } from 'src/modules/person/person.service';

@Controller('/api/auth/accesstoken')
export class AccesstokenController {
    constructor(
        private readonly accessTokenService: AccesstokenService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly personService: PersonService
    ) {}
    private logger = new Logger(AccesstokenController.name);

    @Post('refresh')
    // @UseInterceptors(AnyFilesInterceptor())
    createAccessToken(@Req() request: Request, @Res() response: Response) {
        let refreshToken = null;
        let statusCode: number;
        let responseData: ResponseData<{}> = new ResponseData<{}>()
        try {
            refreshToken = refreshToken.cookie['refreshToken'];

            if (!refreshToken) {
                statusCode = HttpCode.UNAUTHORIZED;
                throw new Error("Refresh Token is not found");
            }

            let personId = this.refreshTokenService.parseToId(refreshToken);

            if(personId == -1){
                statusCode = HttpCode.UNAUTHORIZED;
                throw new Error("Refresh token is invalid");
            }

            



        } catch (e) {
            this.logger.error(e.message)
            switch (statusCode) {
                case HttpCode.UNAUTHORIZED: {
                    response.statusMessage = HttpMessage.UNAUTHORIZED;
                    break;
                }
                default: {
                    response.statusCode = HttpCode.INTERNAL_SERVER_ERROR;
                    response.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
                    response.send(
                        new ResponseData<{}>({ data: {}, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR })
                    )
                }
            }
        }


    }


}
