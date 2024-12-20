import { ApiProperty } from "@nestjs/swagger";
import { HttpCode, HttpMessage } from "src/common/enum.global";

export class OkSongResponseDto {
    @ApiProperty({
        example: [
            {
                "songId": 1,
                "songName": "Hello world",
                "songImage": "public\\uploads\\songs\\image\\files-1734610528083-92133898.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
            },
            {
                "songId": 2,
                "songName": "Hello world 1",
                "songImage": "public\\uploads\\songs\\image\\files-1734610535490-582008253.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
            },
            {
                "songId": 3,
                "songName": "Hello world 2",
                "songImage": "public\\uploads\\songs\\image\\files-1734610538047-388671050.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
            },
            {
                "songId": 4,
                "songName": "Hello world 3",
                "songImage": "public\\uploads\\songs\\image\\files-1734610540281-809339052.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
            },
            {
                "songId": 5,
                "songName": "Hello world 4",
                "songImage": "public\\uploads\\songs\\image\\files-1734610542557-980341372.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
            },
            {
                "songId": 6,
                "songName": "Hello world 5",
                "songImage": "public\\uploads\\songs\\image\\files-1734610544565-776176065.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
            },
            {
                "songId": 7,
                "songName": "Hello world 6",
                "songImage": "public\\uploads\\songs\\image\\files-1734610546980-545505844.jpg",
                "songDuration": 2,
                "listenTimes": 0,
                "songArtist": {
                    "artistId": 1,
                    "artistName": "LeeLy2802"
                }
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