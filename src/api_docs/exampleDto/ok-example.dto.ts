import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class OkExampleDto {
    @ApiProperty({
        example: null,
        description: 'Data is returned by server'
    })
    data: any  = null;

    @ApiProperty({
        example: HttpCode.OK,
        description: 'Http code'

    })
    statusCode: number = null;

    @ApiProperty({
        example: HttpMessage.OK,
        description: 'Status message'
    })
    message: any = null;
}