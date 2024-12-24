import { ApiProperty } from '@nestjs/swagger';
import * as ClassValidator from 'class-validator';


export class ConfirmAccountDto {

    @ClassValidator.IsNotEmpty()
    @ClassValidator.IsNumber({allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0})
    @ClassValidator.MaxLength(5) 
    @ClassValidator.MinLength(5)
    @ApiProperty({
        description: 'Opt code received from gmail',
        example: 43587
    })
    optCode: number;
}