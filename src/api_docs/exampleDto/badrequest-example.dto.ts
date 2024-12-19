import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class BadRequestExampleDto {
    @ApiProperty({
        example: null,
        description: 'Data is returned by server'
    })
    data: any  = null;

    @ApiProperty({
        example: HttpCode.BAD_REQUEST,
        description: 'Http code'

    })
    statusCode: number = null;

    @ApiProperty({
        example: HttpMessage.BAD_REQUEST,
        description: 'Status message'
    })
    message: any = null;
}