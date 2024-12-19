import { Body, Controller, Delete, Get, Logger, Post, Put, Query, Req, Res } from '@nestjs/common';
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

@Controller({ path: 'playlist', version: '1' })
export class PlaylistController {
    private readonly logger: Logger = new Logger(PlaylistController.name)
    constructor(
        private readonly playlistService: PlaylistService,
        private readonly accessTokenService: AccesstokenService,
        private readonly personService: PersonService
    ) { }


    //TODO: Create method allowing users get their playlists
    // @Get()
    // getPlaylist(){}

    //TODO: Create method allowing users get their songs form their created playlists
    // @Get()
    // getSongFromPlaylist(){}



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

            this.playlistService.createPlayList(createPlaylistDto.playlistName, userInstance)
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

    //TODO: Create method allowing users add songs to their created playlist
    // @Put()
    // addSongsToPlaylist(){}

    //TODO: Create method allowing users remove songs from their created playlist
    // @Put()
    //removeSongsFromPlaylist(){}

    //TODO: Create method allowing users modify their created playlist
    // @Put()
    // modifyPlaylist(){}


    //TODO: Create method allowing users delete their created playlist
    @ApiOperation({
        summary: '[Deleta a playlist]: Delete owned playlist by using playlist id (User own this playlist) <<Require: Access Token>>'
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

            let userId = this.accessTokenService.decodeToUserId(userAccessToken);
            if (userId = -404) throw new Error(HttpMessage.UNAUTHORIZED);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance || userInstance.personStatus == UserStatus.Deleted) throw new Error(HttpMessage.UNAUTHORIZED);

            if(!(await this.playlistService.isOwnedBy(deletePlaylistDto.playlistId, userId))) throw new Error(HttpMessage.FORBIDDEN);

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
