import { ApiProperty } from '@nestjs/swagger';
import * as ClassValidator from 'class-validator'

export class RegisterDto {
    @ApiProperty({
        description: 'User email',
        example: 'nguyenthily2802@example.com'
    })
    @ClassValidator.IsEmail()
    userEmail: string;

    @ApiProperty({
        description: 'User name',
        example: 'Nguyen Ly'
    })
    @ClassValidator.IsNotEmpty()
    username: string;

    @ApiProperty({
        description: 'User password',
        example: 'leelyyyyy'
    })
    @ClassValidator.IsNotEmpty()
    userPassword: string
}