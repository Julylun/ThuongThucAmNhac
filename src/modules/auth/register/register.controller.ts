import { Body, Controller, Logger, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';
import { ParseFormDataToStringPipe } from 'src/common/pipe/formdata.pipe';
import { Person } from 'src/modules/person/person.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';

@Controller({path: 'register', version: '1'})
export class RegisterController {
    constructor(private readonly registerService: RegisterService) { }
    private readonly log = new Logger(RegisterController.name)

    /**
     * [REST API]: POST /api/register -> REGISTER NEW ACCOUNT
     * 
     * This method is used to register a new user by using POST method with fetch API from client.
     * Client has to send a JSON object with the following properties:
     * - userEmail: string
     * - username: string
     * - userPassword: string
     * @param registerDto 
     * @returns 
     */
    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async register(@Body() registerDto: RegisterDto) {
        try {
            this.log.debug(registerDto)
            if(this.registerService.register(registerDto) == null) throw new Error('INTERNAL_SERVER_ERROR')
            return new ResponseData<{}>({
                data: null,
                statusCode: HttpCode.CREATED,
                message: HttpMessage.CREATED
            })
        } catch (error) {
            this.log.error(error)
            return new ResponseData<{}>({
                data: null,
                statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                message: HttpMessage.INTERNAL_SERVER_ERROR
            })

        }
    }
}
