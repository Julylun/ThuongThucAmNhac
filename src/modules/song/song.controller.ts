import { Body, Controller, Get, InternalServerErrorException, Logger, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request, Response } from 'express';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { ResponseData } from 'src/common/class.global';
import { SongService } from './song.service';
import { AccesstokenService } from '../auth/accesstoken/accesstoken.service';
import { headerToToken } from 'src/common/function.global';
import { PersonService } from '../person/person.service';
import { UserType } from '../person/person.enum';
import { Song } from './entity/song.entity';
import { SongInfoDto, songsToSongInfoDtos } from './dto/songinfo.dto';
import { createReadStream, statSync } from 'fs';
import { parseFile } from 'music-metadata';
import * as mime from 'mime-types';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { InternalServerErrorExampleDto } from 'src/api_docs/exampleDto/internalservererror-example.dto';
import { NotFoundExampleDto } from 'src/api_docs/exampleDto/notfound-example.dto';
import { UnauthorizedExampleDto } from 'src/api_docs/exampleDto/unauthorized-example.dto';
import { BadRequestCreatePersonDto } from 'src/api_docs/exampleDto/person/badrequest-createPerson.dto';
import { CreatedExampleDto } from 'src/api_docs/exampleDto/created-example.dto';
import { ForbiddenExampleDto } from 'src/api_docs/exampleDto/forbidden-example.dto';
import { BadRequestExampleDto } from 'src/api_docs/exampleDto/badrequest-example.dto';
import { OkSongResponseDto } from 'src/api_docs/exampleDto/song/ok-songResponse.dto';

@Controller({ path: 'song', version: '1' })
export class SongController {
    constructor(
        private songService: SongService,
        private accessTokenService: AccesstokenService,
        private personService: PersonService
    ) { }

    private logger = new Logger(SongController.name)

    @ApiOperation({
        summary: '[Get song]: Get song stream by using song id'
    })
    @ApiQuery({
        name: 'id',
        type: Number,
        description: 'The Id of searching song',
        required: true,
        example: 1
    })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - OK]: Return an music stream (To easily understand, try to access this api through google search).',
    })
    @ApiResponse({
        status: HttpCode.NOT_FOUND,
        description: '[404 - Not found]: Return nothing because the song is not found.',
        type: NotFoundExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occured while executing the request.',
        type: InternalServerErrorExampleDto
    })
    @Get('stream')
    async streamSong(@Query('id') id: number, @Res() res: Response) {
        try {
            this.logger.debug('Stream song with id -> ' + id);
            let song = await this.songService.getSongById(id);
            if (song == null) {
                throw new Error('NOT_FOUND');
            }

            this.logger.debug('Song found');
            this.logger.debug(song);
            this.logger.debug('Start streaming song');

            let songFile = await parseFile(song.songPath)
            let mimeType = mime.lookup(song.songPath);


            this.logger.debug('Song file parsed, file format is below this line');
            this.logger.debug(songFile);
            this.logger.debug('mime type -> ', mime.lookup(song.songPath));

            res.set({
                'Content-Type': mimeType,
                'Content-Length': statSync(song.songPath).size
            })

            const fileStream = createReadStream(song.songPath);
            res.status(HttpCode.OK);
            res.statusMessage = HttpMessage.OK;
            fileStream.pipe(res);
        } catch (e) {
            switch (e.message) {
                case 'NOT_FOUND': {
                    this.logger.error(e.message);
                    res.status(HttpCode.NOT_FOUND);
                    res.statusMessage = HttpMessage.NOT_FOUND;
                    res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.NOT_FOUND, message: HttpMessage.NOT_FOUND }));
                    return;
                }
            }

            this.logger.error(e.message);
            res.status(HttpCode.INTERNAL_SERVER_ERROR);
            res.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR }));
        }
    }


    @ApiOperation({
        summary: '[Create song]: Upload song by using form data and file'
    })
    @ApiBody({
        description: 'This form data requires:\n+ files: Image File (png, jpeg, jpg)\n+ files: Music File (mp3, mpeg, wav)\n+ songName: string<br>Learn more at: [Use file in form data object tutorial](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest_API/Using_FormData_Objects)'
    })
    @ApiResponse({
        status: HttpCode.CREATED,
        description: '[201 - Created]: Create song successfully.',
        type: CreatedExampleDto
    })
    @ApiResponse({
        status: HttpCode.BAD_REQUEST,
        description: '[400 - Bad request]: Missing required parameters.',
        type: BadRequestExampleDto
    })
    @ApiResponse({
        status: HttpCode.FORBIDDEN,
        description: '[403 - Forbidden]: User dont have permission to upload song.',
        type: ForbiddenExampleDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Not found]: Missing Access token or its wrong/expired.',
        type: UnauthorizedExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occured while executing the request.',
        type: InternalServerErrorExampleDto
    })
    @Post('upload')
    @UseInterceptors(
        FilesInterceptor('files', 2, {  // Sử dụng FilesInterceptor cho hai file: một cho nhạc và một cho hình ảnh
            storage: diskStorage({
                destination: (req, file, callback) => {
                    let logger = new Logger(SongController.name);
                    logger.debug('file is below this line');
                    if (file.mimetype.startsWith('audio/')) {
                        callback(null, './uploads/songs/audio');
                    } else if (file.mimetype.startsWith('image/')) {
                        callback(null, './public/uploads/songs/image');
                    } else {
                        callback(new Error('Invalid file type'), null);
                    }
                },
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                let logger = new Logger(SongController.name);
                logger.debug('Start file filter');
                const allowedMimeTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'image/png', 'image/jpeg', 'image/jpg'];
                if (allowedMimeTypes.includes(file.mimetype)) {
                    callback(null, true);
                } else {
                    callback(new Error('Invalid file type'), false);
                }
            },
            limits: {
                fileSize: 1024 * 1024 * 20,  // limit 10mb each file
            }
        }),
    )
    async uploadSong(@UploadedFiles() files: Express.Multer.File[], @Body() formData: any, @Req() req: Request, @Res() res: Response) {
        try {
            this.logger.debug('file is below this line');
            this.logger.debug(files);

            this.logger.debug('formData is below this line');
            this.logger.debug(formData);

            if (!files || files.length != 2) {
                throw new Error('BAD_REQUEST');
            }

            const songFile = files.find(file => file.mimetype.startsWith('audio/'));
            const imageFile = files.find(file => file.mimetype.startsWith('image/'));
            if (!songFile || !imageFile) {
                throw new Error('BAD_REQUEST');
            }


            let artistId = this.accessTokenService.decodeToUserId(headerToToken(req));

            this.logger.debug('artistId -> ' + artistId);
            let artist = await this.personService.getPerson(artistId);

            if (artist == null) {
                this.logger.error('Artist not found');
                throw new Error('UNAUTHORIZED');
            }

            if (artist.personType != UserType.Artist) {
                this.logger.error('User is not an artist');
                throw new Error('FORBIDDEN');
            }

            let song = await this.songService.createSong((formData.songName) ? formData.songName : songFile.originalname, songFile.path, imageFile.path, await this.songService.getSongDuration(songFile.path), artist, 0);

            if (song == null) {
                this.logger.error('Unknown error || song is created but still null');
                throw new Error('INTERNAL_SERVER_ERROR');
            }

            this.logger.debug('Song created');
            res.status(HttpCode.CREATED);
            res.statusMessage = HttpMessage.CREATED;
            res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.CREATED, message: HttpMessage.CREATED }));
            return;
        } catch (e) {
            switch (e.message) {
                case 'UNAUTHORIZED': {
                    this.logger.error(e.message);
                    res.status(HttpCode.UNAUTHORIZED);
                    res.statusMessage = HttpMessage.UNAUTHORIZED;
                    res.send(new ResponseData<null>({ data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED }));
                    return;
                }
                case 'FORBIDDEN': {
                    this.logger.error(e.message);
                    res.status(HttpCode.FORBIDDEN);
                    res.statusMessage = HttpMessage.FORBIDDEN;
                    res.send(new ResponseData<null>({ data: null, statusCode: HttpCode.FORBIDDEN, message: HttpMessage.FORBIDDEN }));
                    return;
                }
                case 'BAD_REQUEST': {
                    this.logger.error(e.message);
                    res.status(HttpCode.BAD_REQUEST);
                    res.statusMessage = HttpMessage.BAD_REQUEST;
                    res.send(new ResponseData<null>({ data: null, statusCode: HttpCode.BAD_REQUEST, message: HttpMessage.BAD_REQUEST }));
                    return;
                }
            }
            this.logger.error(e.message);
            res.status(HttpCode.INTERNAL_SERVER_ERROR);
            res.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            res.send(new ResponseData<null>({ data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR }));
            return;
        }
    }

    @ApiOperation({
        summary: '[Get suggest song]: Get sugget song following some conditions (This method is still updating)'
    })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - Accept]: Get suggestion song successfully',
        type: OkSongResponseDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: ',
        type: InternalServerErrorExampleDto
    })
    @Get('suggest')
    async getSong(
        @Req() req: Request,
        @Res() res: Response
    ) {
        this.logger.log('[getSong - suggest]: A client sent a request to this server to execute');
        let responseData: ResponseData<any> = null;
        try {
            let songs = await this.songService.getSongsByListenTime()
            if (!songs) {
                this.logger.error('Unknown error || songs is null');
                throw new Error('INTERNAL_SERVER_ERROR');
            }
            responseData = new ResponseData<SongInfoDto[]>({ data: songsToSongInfoDtos(songs), statusCode: HttpCode.OK, message: HttpMessage.OK })
        } catch (e) {
            this.logger.error(e.message);
            switch (e.message) {
                default: {
                    responseData = new ResponseData<{}>({ data: {}, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR })
                    break;
                }
            }
        } finally {
            res.statusCode = responseData.statusCode;
            res.statusMessage = responseData.message;
            res.send(responseData);
        }
    }


}
