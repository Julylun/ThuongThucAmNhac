import { ApiProperty } from '@nestjs/swagger'
import * as ClassValidator from 'class-validator'
export class LoginDto {
    @ApiProperty({ example: 'nguyenthily2005@example.com', description: 'User email'})
    @ClassValidator.IsNotEmpty()
    email: string

    @ApiProperty({ example: 'leelyyyyy', description: 'User password'})
    @ClassValidator.IsNotEmpty()
    password: string
}