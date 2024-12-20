import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";
import { PersonResponseDto } from "src/modules/person/dto/personResponse.dto";

const personResponseDtoExample = new PersonResponseDto({
    personId: 12,
    personAvatar: 'jiovcxzd18-12-24.png',
    personName: 'LeeLy2802',
    personEmail: 'nguyenthily2005@example.com',
    personType: 1
})


export class OkPersonResponseDto {
    @ApiProperty({
        example: personResponseDtoExample,
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