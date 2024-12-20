import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class ForbiddenExampleDto {
    @ApiProperty({
        example: null,
        description: 'Data is returned by server'
    })
    data: any  = null;

    @ApiProperty({
        example: HttpCode.FORBIDDEN,
        description: 'Http code'

    })
    statusCode: number = null;

    @ApiProperty({
        example: HttpMessage.FORBIDDEN,
        description: 'Status message'
    })
    message: any = null;
}