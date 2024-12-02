import { Body, Controller, Get, Logger, Post, Query, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
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

@Controller('api/song')
export class SongController {
    constructor(
        private songService: SongService,
        private accessTokenService: AccesstokenService,
        private personService: PersonService
    ) { }

    private logger = new Logger(SongController.name)

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
                fileSize: 1024 * 1024 * 10,  // limit 10mb each file
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
                case 'FORBIDDEN': {
                    this.logger.error(e.message);
                    res.status(HttpCode.FORBIDDEN);
                    res.statusMessage = HttpMessage.FORBIDDEN;
                    res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.FORBIDDEN, message: HttpMessage.FORBIDDEN }));
                    return;
                }
                case 'BAD_REQUEST': {
                    this.logger.error(e.message);
                    res.status(HttpCode.BAD_REQUEST);
                    res.statusMessage = HttpMessage.BAD_REQUEST;
                    res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.BAD_REQUEST, message: HttpMessage.BAD_REQUEST }));
                    return;
                }
            }
            this.logger.error(e.message);
            res.status(HttpCode.INTERNAL_SERVER_ERROR);
            res.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR }));
            return;
        }
    }


    @Get('suggest')
    async getSong(
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            this.logger.debug('Get song by suggest type');
            let songs = await this.songService.getSongsByListenTime()
            if (songs == null) {
                this.logger.error('Unknown error || songs is null');
                throw new Error('INTERNAL_SERVER_ERROR');
            }
            res.status(HttpCode.OK);
            res.statusMessage = HttpMessage.OK;
            res.send(new ResponseData<SongInfoDto[]>({ data: songsToSongInfoDtos(songs), statusCode: HttpCode.OK, message: HttpMessage.OK }));
            return;
        } catch (e) {
            this.logger.error(e.message);
            res.status(HttpCode.INTERNAL_SERVER_ERROR);
            res.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            res.send(new ResponseData<{}>({ data: {}, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR }));
            return;
        }
    }


}
