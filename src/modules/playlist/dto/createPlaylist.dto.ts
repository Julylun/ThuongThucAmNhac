import { ApiProperty } from "@nestjs/swagger";
import * as ClassValidator from 'class-validator'

export class CreatePlaylistDto {
    @ApiProperty({
        example: 'Nhac cua Ly',
        description: 'The name of user playlist.'
    })
    @ClassValidator.IsNotEmpty()
    playlistName: string;
}