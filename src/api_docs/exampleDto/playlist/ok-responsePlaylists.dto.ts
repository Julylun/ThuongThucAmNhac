import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class OkResponsePlaylistsDto {
    @ApiProperty({
        example: [
            {
                "playlistId": 1,
                "playlistName": "Yeu la khong buong bo",
                "playlistType": 0
            },
            {
                "playlistId": 2,
                "playlistName": "nhac cua Lun",
                "playlistType": 0
            },
            {
                "playlistId": 3,
                "playlistName": "Nhac cua Ly",
                "playlistType": 0

            },
            {
                "playlistId": 4,
                "playlistName": "Nhac cua chau Lun",
                "playlistType": 0

            },
            {
                "playlistId": 5,
                "playlistName": "Nhac cua chau Ly",
                "playlistType": 0

            },
            {
                "playlistId": 6,
                "playlistName": "Nhac Jack",
                "playlistType": 0

            },
            {
                "playlistId": 7,
                "playlistName": "100 bai hat Thien Ly Oi",
                "playlistType": 0

            },
            {
                "playlistId": 8,
                "playlistName": "Buon vai",
                "playlistType": 0

            },
            {
                "playlistId": 9,
                "playlistName": "Uoc gi",
                "playlistType": 0

            },
            {
                "playlistId": 10,
                "playlistName": "Toi duoc",
                "playlistType": 0

            },
            {
                "playlistId": 11,
                "playlistName": "Thi tot biet may",
                "playlistType": 0

            },
            {
                "playlistId": 12,
                "playlistName": "Do buon",
                "playlistType": 0

            }
        ],
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