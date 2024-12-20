import { ApiProperty } from "@nestjs/swagger";
import { descriptors } from "chart.js/dist/core/core.defaults";
import * as ClassValidator from 'class-validator'

export class ModifyPlaylistDto {
    @ApiProperty({
        example: 1,
        description: 'The id of user playlist.'
    })
    @ClassValidator.IsNotEmpty()
    @ClassValidator.IsNumber()
    playlistId: number;

    @ApiProperty({
        example: 'nhac cua Lun',
        description: 'New playlist name'
    })
    @ClassValidator.IsNotEmpty()
    @ClassValidator.IsString()
    playlistName: string;
}