import { ApiProperty } from "@nestjs/swagger";
import * as ClassValidator from 'class-validator'

export class DeletePlaylistDto {
    @ApiProperty({
        example: 1,
        description: 'The id of user playlist.'
    })
    @ClassValidator.IsNotEmpty()
    @ClassValidator.IsNumber()
    playlistId: number;
}