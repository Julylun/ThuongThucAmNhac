import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class InternalServerErrorExampleDto {
    @ApiProperty({
        example: null,
        description: 'Data is returned by server'
    })
    data: any  = null;

    @ApiProperty({
        example: HttpCode.INTERNAL_SERVER_ERROR,
        description: 'Http code'

    })
    statusCode: number = null;

    @ApiProperty({
        example: HttpMessage.INTERNAL_SERVER_ERROR,
        description: 'Status message'
    })
    message: any = null;
}