import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class CreatedExampleDto {
    @ApiProperty({
        example: null,
        description: 'Data is returned by server'
    })
    data: any  = null;

    @ApiProperty({
        example: HttpCode.CREATED,
        description: 'Http code'

    })
    statusCode: number = null;

    @ApiProperty({
        example: HttpMessage.CREATED,
        description: 'Status message'
    })
    message: any = null;
}