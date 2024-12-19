import { ApiProperty } from "@nestjs/swagger";
import { HttpCode } from "src/common/enum.global";

export class BadRequestCreatePersonDto {
    @ApiProperty({
        example: null,
        description: 'Data is returned by server'
    })
    data: any  = null;

    @ApiProperty({
        example: HttpCode.BAD_REQUEST,
        description: 'Http error code'

    })
    statusCode: number = null;

    @ApiProperty({
        example: '{[{"field": "userEmail", "errors": ["userEmail must be an email"]}]}',
        description: 'Error message'
    })
    message: any = null;
}