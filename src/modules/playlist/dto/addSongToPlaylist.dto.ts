import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddSongToPlaylistDto {
    @ApiProperty({
        description: "Playlist id",
        example: 1
    })
    @IsNotEmpty()
    @IsString()
    playlistId: number;

    @ApiProperty({
        description: "Array of song id",
        example: [1, 2, 3]
    })
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true })
    songsId: number[];
}