import { Body, Controller, Logger, Post, RawBodyRequest, Req, Res, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtMiddleWare } from 'src/modules/auth/accesstoken/jwt.middleware';
import { LoginDto } from './login.dto';
import { ParseFormDataToStringPipe } from 'src/common/pipe/formdata.pipe';
import { LoginService } from './login.service';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { accessSync } from 'fs';
import { log } from 'console';
import { Request, Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

@Controller({path: 'login', version: '1'})
export class LoginController {
    constructor(private readonly loginService: LoginService) { }
    private readonly logger = new Logger(LoginController.name)

    /**
     * [REST API]: POST /api/login -> LOGIN
     * 
     * This method is used to login a user by using POST method with fetch API from client.
     * Client has to send a JSON object with the following properties:
     * - username: string
     * - password: string
     * 
     * 
     * @param loginDto 
     * @param req 
     * @param res 
     */
    @Post()
    @ApiBody({
        description: '',
        type: LoginDto
    })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async login(@Body(new ParseFormDataToStringPipe()) loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
        this.logger.debug("[login]"," Client start a request");
        let loginPromise = null;
        try {
            this.logger.debug('[login]','Client form data will print out below this line');
            this.logger.debug(loginDto)
            loginPromise = await this.loginService.login(loginDto.email, loginDto.password);

            this.logger.debug(req.ip + "- Login completed");
            if (loginPromise.statusCode != HttpCode.ACCEPTED) {
                this.logger.debug(req.ip + "- Login status: failed");
                this.logger.debug(req.ip + "- Error message: " + loginPromise.message);
                throw new Error(loginPromise.message);
            }
            this.logger.debug(req.ip + "- Login status: successfully");

            let loginData = loginPromise.data as { accessToken: string, refreshToken: string }
            this.logger.debug(req.ip + "- accessToken: " + loginData.accessToken);

            this.logger.debug(req.ip + "- Set token to HttpOnlyCookie");
            res.cookie('refreshToken', loginData.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 1296000000 //15 days
            })


            this.logger.debug(req.ip + "- Complete login in controller, returning data..");
            res.status(loginPromise.statusCode);
            res.statusMessage = loginPromise.statusMessage;
            res.send(
                new ResponseData({
                    data: { accessToken: loginData.accessToken },
                    statusCode: loginPromise.statusCode,
                    message: loginPromise.message
                })
            );
        } catch (e) {
            if (loginPromise == null) {
                res.status(HttpCode.INTERNAL_SERVER_ERROR);
                res.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
                res.send(
                    new ResponseData({
                        data: null,
                        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                        message: HttpMessage.INTERNAL_SERVER_ERROR
                    })
                );
            }
            res.status(loginPromise.statusCode);
            res.statusMessage = loginPromise.message;
            res.send(
                new ResponseData({
                    data: null,
                    statusCode: loginPromise.statusCode,
                    message: loginPromise.message
                })
            )
        }
    }


}


