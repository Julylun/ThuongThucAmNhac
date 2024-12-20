import * as ClassValidator from 'class-validator'

export class songUploadDto {
    songName: string 
    songPath: string
    songDuration: number
    accessToken: string
}