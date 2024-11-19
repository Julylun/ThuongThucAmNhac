import { Body, Controller, Logger, Post, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';
import { ParseFormDataToStringPipe } from 'src/common/pipe/formdata.pipe';
import { Person } from 'src/modules/person/person.entity';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('/api/register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}
    private readonly log = new Logger(RegisterController.name)
    @Post()
    @UsePipes(new ValidationPipe())
    @UseInterceptors(AnyFilesInterceptor())
    async register(@Body() registerDto: RegisterDto): Promise<Person>{
        this.log.debug(registerDto)
        return this.registerService.register(registerDto)
    }
}
