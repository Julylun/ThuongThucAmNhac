import { Body, Controller, Logger, Post, Query, Res, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { GmailService } from 'src/modules/gmail/gmail.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OtpCodeService } from '../otp-code/otp-code.service';
import { Response } from 'express';
import { ConfirmAccountDto } from './dto/confirmAccountdto';
import { InternalServerErrorExampleDto } from 'src/api_docs/exampleDto/internalservererror-example.dto';
import { BadRequestExampleDto } from 'src/api_docs/exampleDto/badrequest-example.dto';
import { ReponseRegisterDto } from 'src/api_docs/exampleDto/register/responseRegister.dto';

@Controller({ path: 'register', version: '1' })
export class RegisterController {
    constructor(
        private readonly registerService: RegisterService,
        private readonly gmailService: GmailService,
        private readonly otpCodeService: OtpCodeService
    ) { }
    private readonly log = new Logger(RegisterController.name)

    @Post('confirm')
    async confirmAccount(@Query('token') token: string, @Body() confirmAccountDto: ConfirmAccountDto) {
        let responseData: ResponseData<any> = null;
        try {
            if (!(await this.otpCodeService.isOtpValid(token))) throw new Error(HttpMessage.BAD_REQUEST);

            let payload = (this.otpCodeService.otpCodeTokenToPayLoad(token)) as { secureCode: number, personId: number };
            if (!payload) throw new Error(HttpMessage.UNAUTHORIZED);

            if (confirmAccountDto.optCode != payload.secureCode) throw new Error(HttpMessage.BAD_REQUEST);

            this.registerService.confirmUser(payload.personId);
            responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK });
        }
        catch (error) {
            switch (error.message) {
                case HttpMessage.BAD_REQUEST: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.BAD_REQUEST, message: HttpMessage.BAD_GATEWAY });
                    break;
                }
                case HttpMessage.UNAUTHORIZED: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED });
                    break;
                }

                default: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR });
                    break;
                }
            }
        } finally {
            return responseData;
        }
    }

    @Post()
    @ApiOperation({
        summary: '[Register new account]: Create a new account with form data.',
        description: 'Nothing to describe here.'
    })
    @ApiBody({
        description: 'The form data requires:\n- userEmail: string (email format)\n- username: string\n- userPassword: string',
        type: RegisterDto
    })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - OK]: Created account and sent a email to person email address.\n\n otpCodeToken is used to fetch api and send otp to backend server\n\nExample: fetch("localhost:port/api/v1/confirm?token=YOUR_OTP_CODE_TOKEN_HERE",{method: "POST", body: data}}',
        type: ReponseRegisterDto 
    })
    @ApiResponse({
        status: HttpCode.BAD_REQUEST,
        description: '[400 - Bad request]: Missing some parameters.',
        type: BadRequestExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal Server Error]: An error occured while executing client request.',
        type: InternalServerErrorExampleDto
    })
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async register(@Body() registerDto: RegisterDto, @Res() response: Response) {
        let responseData: ResponseData<any> = null;
        try {
            this.log.debug(registerDto)
            this.log.debug('check point 1')
            // if (this.registerService.register(registerDto) == null) throw new Error('INTERNAL_SERVER_ERROR')

            let registedPerson = await this.registerService.register(registerDto);
            if (!registedPerson) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);
            this.log.debug('check point 2')

            let otpCodeRepsonse = await this.otpCodeService.generateOtpCode(registedPerson.personId);
            if (otpCodeRepsonse == -1) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);
            this.log.debug('check point 3')

            let otpTemporaryObject = (otpCodeRepsonse as { secureCode, otpCodeToken });
            let mailStatus = this.gmailService.sendMail(registedPerson.personEmail, 'ttan.lunlee@gmail.com', GmailService.MAIL_TYPE_REGISTER, otpTemporaryObject.secureCode);
            if (!mailStatus) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);
            responseData = new ResponseData<any>({
                data: { otpCodeToken: otpTemporaryObject.otpCodeToken },
                statusCode: HttpCode.OK,
                message: HttpMessage.OK
            })
            this.log.debug('check point 4')
        } catch (error) {
            this.log.error(error)
            switch (error.message) {
                case HttpMessage.BAD_REQUEST: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.BAD_REQUEST, message: HttpMessage.BAD_REQUEST });
                    break;
                }
                default: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR });
                    break;
                }
            }
        } finally {
            response.statusCode = responseData.statusCode;
            response.statusMessage = responseData.message;
            response.send(responseData);
            return;
        }
    }



}
