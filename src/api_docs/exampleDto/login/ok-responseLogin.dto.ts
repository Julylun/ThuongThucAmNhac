import { ApiProperty } from "@nestjs/swagger";
import { HttpMessage, HttpCode } from "src/common/enum.global";

export class OkResponseLoginDto {
    @ApiProperty({
        example: {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiTGVlTHkyODAyIiwiaWF0IjoxNzM0NzM0ODQ3LCJleHAiOjE3MzYwMzA4NDd9.0a6SlM-Wk85nb9fsNZTF2-uu_Nzt2JSC4gxQnRhC9Wk"
        },
        description: 'Data is returned by server'
    })
    data: any = null;

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