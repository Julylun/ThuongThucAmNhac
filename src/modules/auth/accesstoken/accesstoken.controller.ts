import { Controller, Logger, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { AccesstokenService } from './accesstoken.service';
import { RefreshTokenService } from '../refreshtoken/refreshtoken.service';
import { PersonService } from 'src/modules/person/person.service';
import { sendResponseData } from 'src/common/function.global';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OkResponseLoginDto } from 'src/api_docs/exampleDto/login/ok-responseLogin.dto';
import { BadRequestExampleDto } from 'src/api_docs/exampleDto/badrequest-example.dto';
import { UnauthorizedExampleDto } from 'src/api_docs/exampleDto/unauthorized-example.dto';

@Controller({ path: 'auth/accesstoken', version: '1' })
export class AccesstokenController {
    constructor(
        private readonly accessTokenService: AccesstokenService,
        private readonly refreshTokenService: RefreshTokenService,
        private readonly personService: PersonService
    ) { }
    private logger = new Logger(AccesstokenController.name);



    @ApiOperation({
        summary: '[Refresh Access Token]: Get a new access token <<Require Refresh Token>>',
        description: 'Generate a new access token by using refresh token. You dont have to do any without fetch this api because refresh token is added automatically when you login.\nBut you must to enable crenditials when fetch api. Example:\n\nfetch(API,{method:"POST", credentials: "include"})'
    })
    @ApiResponse({
        status: HttpCode.OK,
        type: OkResponseLoginDto,
        description: '[200 - OK]: Refresh access token successfully'
    })
    @ApiResponse({
        status: HttpCode.BAD_REQUEST,
        type: BadRequestExampleDto,
        description: '[400 - Bad request]: Missing refresh token. Login to add refresh token automatically'
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        type: UnauthorizedExampleDto,
        description: '[401 - Unauthorized]: User doesnt exist or not allowed to use this method'
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        type: UnauthorizedExampleDto,
        description: '[500 - Internal server error]: An unknown error occured while executing client request'
    })
    @Post('refresh')
    async createAccessToken(@Req() request: Request, @Res() response: Response) {
        let refreshToken = null;
        let responseData: ResponseData<any> = null;
        try {
            refreshToken = request.cookies['refreshToken'];
            if (!refreshToken) throw new Error(HttpMessage.BAD_REQUEST);

            this.logger.debug('checkpoint 1')

            //This verified
            let personId = await this.refreshTokenService.parseToId(refreshToken);
            if (personId == -1) throw new Error(HttpMessage.UNAUTHORIZED);
            this.logger.debug('checkpoint 2')

            let userAccount = await this.personService.getPerson(personId);
            if (!userAccount) throw new Error(HttpMessage.UNAUTHORIZED);
            this.logger.debug('checkpoint 3')

            let accessTokenObj = await this.accessTokenService.generate(userAccount);
            this.logger.debug('checkpoint 4')

            if (!accessTokenObj) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);
            this.logger.debug('checkpoint 5')

            responseData = new ResponseData<any>({
                data: { accessToken: accessTokenObj.jwtToken },
                statusCode: HttpCode.OK,
                message: HttpMessage.OK
            })
        } catch (e) {
            this.logger.error(e.message)
            switch (e.message) {
                case HttpMessage.BAD_REQUEST: {
                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.BAD_REQUEST,
                        message: HttpMessage.BAD_REQUEST
                    })
                    break;
                }
                case HttpMessage.UNAUTHORIZED: {
                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.UNAUTHORIZED,
                        message: HttpMessage.UNAUTHORIZED
                    });
                    break;
                }
                default: {
                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                        message: HttpMessage.INTERNAL_SERVER_ERROR
                    });
                }

            }
        } finally { sendResponseData(response, responseData); }

    }
}
