import * as ClassValidator from 'class-validator'
export class LoginDto {
    @ClassValidator.IsNotEmpty()
    username: string

    @ClassValidator.IsNotEmpty()
    password: string
}