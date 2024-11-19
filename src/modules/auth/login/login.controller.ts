import { Body, Controller, Logger, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
    private readonly logger = new Logger(LoginController.name)

    @Post()
    login(@Body() formData: any): string {
        console.log(formData)
        this.logger.log('FormData: ', formData)
        return 'Login';
    }


}
