import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class ReponseRegisterDto {
    @ApiProperty({
        example: {
            otpCodeToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWN1cmVDb2RlIjoyNzkwMSwicGVyc29uSWQiOjYsImlhdCI6MTczNDk3MDk1NSwiZXhwIjoxNzM2MjY2OTU1fQ.0IcmzcJAXdj8Si_tKgzqUmgH-VmCwkUrJF9dMFlG7AE'
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