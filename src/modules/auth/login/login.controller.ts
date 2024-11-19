import { Body, Controller, Logger, Post, RawBodyRequest, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { JwtMiddleWare } from 'src/common/middleware/jwt.middleware';
import { LoginDto } from './login.dto';
import { ParseFormDataToStringPipe } from 'src/common/pipe/formdata.pipe';
import { LoginService } from './login.service';

@Controller('/api/login')
export class LoginController {
    constructor(private readonly loginService: LoginService){}
    private readonly logger = new Logger(LoginController.name)

    @Post()
    @UseGuards(JwtMiddleWare)
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async login(@Body(new ParseFormDataToStringPipe()) loginDto: LoginDto): Promise<{}> {
        return this.loginService.login(loginDto.username, loginDto.password)
    }


}
