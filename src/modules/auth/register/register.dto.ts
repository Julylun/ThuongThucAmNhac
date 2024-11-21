import * as ClassValidator from 'class-validator'

export class RegisterDto {
    @ClassValidator.IsEmail()
    userEmail: string;

    @ClassValidator.IsNotEmpty()
    username: string;

    @ClassValidator.IsNotEmpty()
    userPassword: string
}