import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class OkResponsePlaylistsDto {
    @ApiProperty({
        example: [
            {
                "playlistId": 1,
                "playlistName": "Yeu la khong buong bo"
            },
            {
                "playlistId": 2,
                "playlistName": "nhac cua Lun"
            },
            {
                "playlistId": 3,
                "playlistName": "Nhac cua Ly"
            },
            {
                "playlistId": 4,
                "playlistName": "Nhac cua chau Lun"
            },
            {
                "playlistId": 5,
                "playlistName": "Nhac cua chau Ly"
            },
            {
                "playlistId": 6,
                "playlistName": "Nhac Jack"
            },
            {
                "playlistId": 7,
                "playlistName": "100 bai hat Thien Ly Oi"
            },
            {
                "playlistId": 8,
                "playlistName": "Buon vai"
            },
            {
                "playlistId": 9,
                "playlistName": "Uoc gi"
            },
            {
                "playlistId": 10,
                "playlistName": "Toi duoc"
            },
            {
                "playlistId": 11,
                "playlistName": "Thi tot biet may"
            },
            {
                "playlistId": 12,
                "playlistName": "Do buon"
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