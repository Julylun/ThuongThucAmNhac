import { Body, Controller, Delete, Get, InternalServerErrorException, Logger, Param, Post, Put, Query, Req, Res } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/createPlaylist.dto';
import { Response, Request } from 'express';
import { ResponseData } from 'src/common/class.global';
import { headerToToken, sendResponseData } from 'src/common/function.global';
import { PlaylistService } from './playlist.service';
import { HttpMessage, HttpCode } from 'src/common/enum.global';
import { AccesstokenService } from '../auth/accesstoken/accesstoken.service';
import { PersonService } from '../person/person.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OkExampleDto } from 'src/api_docs/exampleDto/ok-example.dto';
import { DeletePlaylistDto } from './dto/deletePlaylist.dto';
import { UserStatus } from '../person/person.enum';
import { UnauthorizedExampleDto } from 'src/api_docs/exampleDto/unauthorized-example.dto';
import { ModifyPlaylistDto } from './dto/modifyPlaylist.dto';
import { findIndex } from 'rxjs';
import { InternalServerErrorExampleDto } from 'src/api_docs/exampleDto/internalservererror-example.dto';
import { AddSongToPlaylistDto } from './dto/addSongToPlaylist.dto';
import { SongService } from '../song/song.service';
import { OkResponsePlaylistsDto } from 'src/api_docs/exampleDto/playlist/ok-responsePlaylists.dto';
import { PlaylistType } from './playlist.enum';
import { OkResponsePlaylistSongDto } from 'src/api_docs/exampleDto/playlist/ok-responsePlaylistsSong.dto';

@Controller({ path: 'playlist', version: '1' })
export class PlaylistController {
    private readonly logger: Logger = new Logger(PlaylistController.name)
    constructor(
        private readonly playlistService: PlaylistService,
        private readonly accessTokenService: AccesstokenService,
        private readonly personService: PersonService,
        private readonly songService: SongService
    ) { }


    @ApiOperation({ summary: '[Get playlist]: Get playlists by using Access Token <<Require: Access Token>>', description: 'This method will return a list of playlist including below attributes:\n- playlistId: id \n- playlistName: playlist name \n- playlistType: type of playlist [0: user playlist || 1: favourite playlist].'})
    @ApiResponse({ status: HttpCode.OK, description: '[200 - OK]: Everything is fine.', type: OkResponsePlaylistsDto })
    @ApiResponse({ status: HttpCode.UNAUTHORIZED, description: '[401 - Unauthorized]: Missing access token or it is expired/wrong/invalid.', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.INTERNAL_SERVER_ERROR, description: '[500 - Internal server error]: An unknown error occured in server.', type: InternalServerErrorExampleDto })
    @ApiBearerAuth('access-token')
    @Get()
    async getPlaylist(@Req() request: Request, @Res() response: Response) {
        let responseData: ResponseData<any> = null;
        try {
            let userAccessToken = headerToToken(request);
            if (!userAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            let userPlaylists = await this.playlistService.getPlaylistByUser({ personId: userId });

            responseData = new ResponseData<any>({ data: userPlaylists, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {
            this.logger.error('[getPlaylist]: An error occurs');
            this.logger.error(error);
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: {
                    responseData = ResponseData.createResponse(HttpMessage.UNAUTHORIZED);
                    break;
                }
                default: {
                    responseData = ResponseData.createResponse(HttpMessage.INTERNAL_SERVER_ERROR);
                }
            }
        } finally {
            this.logger.log('[getPlaylist]: Responsing');
            sendResponseData(response, responseData);
        }
    }

    @ApiOperation({ summary: '[Get songs from playlist]: Get songs from a playlist by using playlist id <<Require: Access Token>>' })
    @ApiResponse({ status: HttpCode.OK, description: '[200 - OK]: Everything is fine.', type: OkResponsePlaylistSongDto })
    @ApiResponse({ status: HttpCode.BAD_REQUEST, description: '[400 - Bad request]: Missing params or playlistId is invalid.', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.UNAUTHORIZED, description: '[401 - Unauthorized]: Missing access token or it is expired/wrong/invalid | User doesnt exist or dont have permission to do this action.', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.FORBIDDEN, description: '[403 - Forbidden]: User doesnt have permission to get songs from this playlist (Maybe dont own that playlist)', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.INTERNAL_SERVER_ERROR, description: '[500 - Internal server error]: An unknown error occured in server.', type: InternalServerErrorExampleDto })
    @ApiBearerAuth('access-token')
    @Get('get-songs/:playlistId')
    async getSongFromPlaylist(@Param('playlistId') playlistId: number, @Req() request: Request, @Res() response: Response) {
        let responseData: ResponseData<any> = null;
        this.logger.log('[getSongFromPlaylist]: Start a request');
        this.logger.log('[getSongFromPlaylist]: PlaylistId = ', playlistId);
        try {
            if (!playlistId) throw new Error(HttpMessage.BAD_REQUEST);

            let userAccessToken = headerToToken(request);
            if (!userAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            if (!(await this.playlistService.isOwnedBy(playlistId, userId))) throw new Error(HttpMessage.FORBIDDEN);

            let playlist = await this.playlistService.getPlaylist({ playlistId: playlistId });
            if (!playlist) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);
            
            this.logger.log('[getSongFromPlaylist]: Playlist = ');
            console.log(playlist);
            responseData = new ResponseData<any>({ data: playlist, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {
            this.logger.error('[getSongFromPlaylist]: An error occurs');
            this.logger.error(error);
            switch (error.message) {
                case HttpMessage.BAD_REQUEST: {
                    responseData = ResponseData.createResponse(HttpMessage.BAD_REQUEST);
                    break;
                }
                case HttpMessage.UNAUTHORIZED: {
                    responseData = ResponseData.createResponse(HttpMessage.UNAUTHORIZED);
                    break;
                }
                default: {
                    responseData = ResponseData.createResponse(HttpMessage.INTERNAL_SERVER_ERROR);
                }
            }
        } finally {
            sendResponseData(response, responseData);
        }
    }



    @ApiOperation({
        summary: '[Create playlist]: Allow user create playlist by their access token and form data <<Require: Access Token>>'
    })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - OK]: Everything is okay, chill guy a\'.',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorized]: Missing Token or it is invalid (expired/wrong).',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occured while executing client request.',
        type: OkExampleDto
    })
    @ApiBody({
        description: 'Form data require:\n+ playlistName: string',
        type: CreatePlaylistDto
    })
    @ApiBearerAuth('access-token')
    @Post()
    async createPlaylist(@Body() createPlaylistDto: CreatePlaylistDto, @Req() request: Request, @Res() response: Response) {
        this.logger.log('[createPlaylist]: Client start a request')
        this.logger.log('[createPlaylist]: Form data: ');
        this.logger.log(createPlaylistDto);

        let responseData: ResponseData<any> = null;
        try {
            let userAccessToken = headerToToken(request);
            if (!userAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance) throw new Error(HttpMessage.UNAUTHORIZED);

            this.playlistService.createPlayList(createPlaylistDto.playlistName, userInstance, PlaylistType.USER)
            responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {

            this.logger.error(error)
            //FIXME: Change catching error method
            //Error can be catch: Unauthorized (missing accesstoken/dont have permission/access token is expired), BadRequest (missing params), InternalServerError (unknown error)
            //*Shouldn't catch error like this but i'm too lazyyyy :(
            responseData = ResponseData.createResponse(error);
        } finally {
            this.logger.log('[createPlaylist]: Responsing');
            sendResponseData(response, responseData);
        }
    }

    @ApiOperation({ summary: '[Add songs to playlist]: Allow user add/remove songs to their created playlist by using Access Token and form data <<Require: Access Token>>\n' })
    @ApiResponse({ status: HttpCode.OK, description: '[200 - OK]: Everything is fine.', type: OkExampleDto })
    @ApiResponse({ status: HttpCode.BAD_REQUEST, description: '[400 - Bad request]: Missing params or songId/userId is invalid.', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.UNAUTHORIZED, description: '[401 - Unauthorized]: Missing access token or it is expired/wrong/invalid | User doesnt exist or dont have permission to do this action.', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.FORBIDDEN, description: '[403 - Forbidden]: User doesnt have permission to add songs to this playlist (Maybe dont own that playlist)', type: UnauthorizedExampleDto })
    @ApiResponse({ status: HttpCode.INTERNAL_SERVER_ERROR, description: '[500 - Internal server error]: An unknown error occured in server.', type: InternalServerErrorExampleDto })
    @ApiBody({ description: 'Form data requires:\n+ playlistId: int\n+ songsId: int[]\n+ methodType: string (OPTIONAL) - ["add"/null/other: Add songs to playlist || "remove": Remove songs from playlist]\n\nNote 1: If songs are duplicated, they will not be added to playlist.\n\nNote 2: If you dont need to use methodType, remote that parameter from your form data.', type: AddSongToPlaylistDto })
    @ApiBearerAuth('access-token')
    @Put('add-songs')
    async addSongsToPlaylist(@Body() addSongToPlayListDto: AddSongToPlaylistDto, @Req() request: Request, @Res() response: Response) {
        this.logger.log('[createPlaylist]: Client start a request')
        this.logger.log('[createPlaylist]: Form data: ');
        this.logger.log(addSongToPlayListDto);

        let responseData: ResponseData<any> = null;
        try {
            this.logger.debug('[addSongsToPlaylist]: checkpoint 1');
            let userAccessToken = headerToToken(request);
            if (!userAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance) throw new Error(HttpMessage.UNAUTHORIZED);

            this.logger.debug('[addSongsToPlaylist]: checkpoint 2');
            if (!(await this.playlistService.isOwnedBy(addSongToPlayListDto.playlistId, userId))) throw new Error(HttpMessage.FORBIDDEN);

            addSongToPlayListDto.songsId.forEach(songId => {
                if (!this.songService.isSongExist(songId)) throw new Error(HttpMessage.BAD_REQUEST);
            });

            let songList = await this.songService.getSongByIdList(addSongToPlayListDto.songsId);
            if (!songList) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);

            if (!(await this.playlistService.isPlaylistExist(addSongToPlayListDto.playlistId))) throw new Error(HttpMessage.BAD_REQUEST);

            this.logger.debug('[addSongsToPlaylist]: checkpoint 3');
            if (addSongToPlayListDto.methodType == 'remove')
                this.playlistService.removeSongsToPlaylist(addSongToPlayListDto.playlistId, songList);
            this.playlistService.addSongsToPlaylist(addSongToPlayListDto.playlistId, songList);

            responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {
            this.logger.error('[addSongsToPlaylist]: An error occurs');
            this.logger.error(error)
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: {
                    responseData = ResponseData.createResponse(HttpMessage.UNAUTHORIZED);
                    break;
                }
                case HttpMessage.BAD_REQUEST: {
                    responseData = ResponseData.createResponse(HttpMessage.BAD_REQUEST);
                    break;
                }
                case HttpMessage.FORBIDDEN: {
                    responseData = ResponseData.createResponse(HttpMessage.FORBIDDEN);
                    break;
                }
                default: {
                    responseData = ResponseData.createResponse(HttpMessage.INTERNAL_SERVER_ERROR);
                }
            }
        } finally {
            sendResponseData(response, responseData);
        }
    }

    @ApiOperation({
        summary: '[Modify playlist]: Modifying playlist by using Access Token and from data <<Require: Access Token>>'
    })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - OK]: OK OK OK OKO KO KO hmu hmu nhieu api qua',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorzied]: Missing access token or it is expired/wrong/invalid | User doesnt exist or dont have permission to do this action.',
        type: UnauthorizedExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occured in server.',
        type: InternalServerErrorExampleDto
    })
    @ApiBody({
        description: 'Form data requires:\n+ playlistId: int\n+ playlistName: string',
        type: ModifyPlaylistDto
    })
    @ApiBearerAuth('access-token')
    @Put()
    async modifyPlaylist(@Body() modifyPlaylistDto: ModifyPlaylistDto, @Res() response: Response, @Req() request: Request) {
        this.logger.log('[deletePlaylist]: Start a request');
        this.logger.log('[deletePlaylist]: ', modifyPlaylistDto);

        let responseData: ResponseData<any> = null;
        try {
            let userAccessToken = headerToToken(request)
            if (!userAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);
            this.logger.debug('[deletePlaylist]: access token = ' + userAccessToken);

            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            this.logger.debug('[deletePlaylist]: userId = ', userId);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);
            if (userId == -500) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance || userInstance.personStatus == UserStatus.Deleted) throw new Error(HttpMessage.UNAUTHORIZED);

            if (!(await this.playlistService.modifyPlaylist(modifyPlaylistDto.playlistId, { playlistName: modifyPlaylistDto.playlistName })))
                throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);

            responseData = ResponseData.createResponse(HttpMessage.OK);
        } catch (error) {
            this.logger.error('[modifyPlaylist]: An error occurs');
            this.logger.error(error);
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: {
                    responseData = ResponseData.createResponse(HttpMessage.UNAUTHORIZED);
                    break;
                }
                default: {
                    responseData = ResponseData.createResponse(HttpMessage.INTERNAL_SERVER_ERROR);
                }
            }
        } finally {
            sendResponseData(response, responseData);
        }
    }


    @ApiOperation({
        summary: '[Deleta a playlist]: Delete owned playlist by using playlist id (User own this playlist) <<Require: Access Token>>'
    })
    @ApiResponse({
        status: HttpCode.OK,
        description: 'Everything is fine.',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorized]: User doesnt exist/be deleted | Access Token is invalid/expired/missing/wrong',
        type: UnauthorizedExampleDto
    })
    @ApiResponse({
        status: HttpCode.FORBIDDEN,
        description: '[403 - Forbidden]: User doesnt have permission to delete this playlist (Maybe dont own that playlist)',
        type: UnauthorizedExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown occured on server when executing request.',
        type: UnauthorizedExampleDto
    })
    @ApiBody({
        description: 'The form data require:\n+ playlistId: int',
        type: DeletePlaylistDto
    })
    @ApiBearerAuth('access-token')
    @Delete()
    async deltePlaylist(@Body() deletePlaylistDto: DeletePlaylistDto, @Req() request: Request, @Res() response: Response) {
        this.logger.log('[deletePlaylist]: Start a request');
        this.logger.log('[deletePlaylist]: ', deletePlaylistDto);
        let responseData: ResponseData<any> = null;
        try {
            let userAccessToken = headerToToken(request)
            if (!userAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);
            this.logger.debug('[deletePlaylist]: access token = ' + userAccessToken);


            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            this.logger.debug('[deletePlaylist]: userId = ', userId);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);
            if (userId == -500) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance || userInstance.personStatus == UserStatus.Deleted) throw new Error(HttpMessage.UNAUTHORIZED);

            if (!(await this.playlistService.isOwnedBy(deletePlaylistDto.playlistId, userId))) throw new Error(HttpMessage.FORBIDDEN);

            let deletionStatus = this.playlistService.deletePlaylist(deletePlaylistDto.playlistId);
            if (!deletionStatus) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);

            responseData = new ResponseData<null>({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {
            this.logger.error('[deletePlaylist]: An error occured!');
            this.logger.error(error);
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: { //User doesnt exist | is deleted || Access Token is invalid/expired/missing/wrong
                    responseData = ResponseData.createResponse(HttpMessage.UNAUTHORIZED);
                    break;
                }
                case HttpMessage.FORBIDDEN: { //User doesnt have permission to delete this playlist
                    responseData = ResponseData.createResponse(HttpMessage.FORBIDDEN);
                    break;
                }
                default: { //Unknown error case
                    responseData = ResponseData.createResponse(HttpMessage.INTERNAL_SERVER_ERROR);
                    break;
                }
            }
        } finally {
            sendResponseData(response, responseData);
        }
    }
}
