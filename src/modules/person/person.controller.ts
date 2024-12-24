import { Body, Controller, Delete, Get, Logger, Post, Put, Query, Req, Res, UseInterceptors, UsePipes } from '@nestjs/common';
import { PersonService } from './person.service';
import { Request, Response, response } from 'express';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { AccesstokenService } from '../auth/accesstoken/accesstoken.service';
import { PersonResponseDto } from './dto/personResponse.dto';
import { UserStatus, UserType } from './person.enum';
import { headerToToken, sendResponseData } from 'src/common/function.global';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/createPerson.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { HashService } from '../auth/hash/hash.service';
import { CreatePersonValidation } from 'src/common/validation/CreatePersonValidation';
import { BadRequestCreatePersonDto } from 'src/api_docs/exampleDto/person/badrequest-createPerson.dto';
import { OkExampleDto } from 'src/api_docs/exampleDto/ok-example.dto';
import { InternalServerErrorExampleDto } from 'src/api_docs/exampleDto/internalservererror-example.dto';
import { OkPersonResponseDto } from 'src/api_docs/exampleDto/person/ok-personResponse.dto';
import { UnauthorizedExampleDto } from 'src/api_docs/exampleDto/unauthorized-example.dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';
import { BadRequestExampleDto } from 'src/api_docs/exampleDto/badrequest-example.dto';
import { isNumber } from 'class-validator';
import { NotFoundExampleDto } from 'src/api_docs/exampleDto/notfound-example.dto';


@ApiTags('User')
@Controller({ path: 'user', version: '1' })
export class PersonController {
    constructor(
        private personService: PersonService,
        private accessTokenService: AccesstokenService,
        private hashService: HashService
    ) { }

    private readonly logger: Logger = new Logger(PersonController.name)



    // [GET]: get user by bearer token (Access token)
    @Get()
    @ApiOperation({ summary: '[Get user by bearer token]: Use access token to get user data <<Require: Access token>>' })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - Accept]: This case occurs when fetch API is successful and have no error.',
        type: OkPersonResponseDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorized]: This case occurs when client require get their information without access token.',
        type: UnauthorizedExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: Server is having some unknown errors. Theese error occurs in executing client request.',
        type: InternalServerErrorExampleDto
    })
    @ApiBearerAuth('access-token')
    async getUser(@Req() request: Request, @Res() response: Response): Promise<any> {
        let responseData: ResponseData<any> = null;
        try {
            let personAccessToken = headerToToken(request);
            if (!personAccessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let personId = this.accessTokenService.decodeToUserId(personAccessToken);
            if (personId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            let personAccount = await this.personService.getPerson(personId);
            if (!personAccount) throw new Error(HttpMessage.UNAUTHORIZED);

            let personDto = this.personService.personToPersonDto(personAccount, PersonResponseDto.name)
            responseData = new ResponseData<any>({ data: personDto, statusCode: HttpCode.OK, message: HttpMessage.OK })
        } catch (error) {
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED })
                    break;
                }
                default: {
                    responseData = new ResponseData<any>({ data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR})
                    break;
                }
            }
        } finally {
            sendResponseData(response, responseData);
        }




        // const unauthorizedResponse = new ResponseData<any>({ data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED });
        // const authHeader = request.headers['authorization'];
        // if (authHeader && authHeader.startsWith('Bearer ')) {
        //     const token = authHeader.slice(7, authHeader.length);

        //     let decodedTokenData = this.accessTokenService.decode(token);
        //     if (decodedTokenData == null) return unauthorizedResponse;
        //     let personId = decodedTokenData.sub;
        //     this.personService.getPerson(personId).then((person) => {
        //         if (person == null) return unauthorizedResponse;
        //         if (person.personStatus == UserStatus.Deleted) return unauthorizedResponse;
        //         response.status(HttpCode.OK);
        //         response.statusMessage = HttpMessage.OK;
        //         response.send(new ResponseData<any>({ data: this.personService.personToPersonDto(person, PersonResponseDto.name), statusCode: HttpCode.OK, message: HttpMessage.OK }))
        //     });
        // }
        // response.status(unauthorizedResponse.statusCode);
        // response.statusMessage = unauthorizedResponse.message;
        // response.send(unauthorizedResponse);
    }






    //[Put]: Change user role from user to artist
    @Put('/to_artist')
    @ApiOperation({ summary: '[Change user role to artist by access token]: Change user role from user to artist. <<Require: Access Token>>' })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - Accept]: This case occurs when everything is okay.',
        type: OkExampleDto

    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorized]: This case occurs when Access token doesnt send to server, or it is expired or wrong access token.',
        type: UnauthorizedExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: Server is having some unknown errors. Theese error occurs in executing client request.',
        type: InternalServerErrorExampleDto
    })
    @ApiBearerAuth('access-token')
    async changeRoleToArtist(@Req() request: Request, @Res() response: Response): Promise<any> {
        let accessToken = headerToToken(request);

        if (accessToken == null) {
            response.status(HttpCode.UNAUTHORIZED);
            response.statusMessage = HttpMessage.UNAUTHORIZED;
            response.send(new ResponseData<any>({ data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED }));
        }

        let userId = this.accessTokenService.decodeToUserId(accessToken);

        if (userId == -404) {
            response.status(HttpCode.UNAUTHORIZED);
            response.statusMessage = HttpMessage.UNAUTHORIZED;
            response.send(new ResponseData<any>({ data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED }));
        }
        if (userId == -500) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR);
            response.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            response.send(new ResponseData<any>({ data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR }));
        }


        let changeRoleResult = await this.personService.changeRole(
            await this.personService.getPerson(userId),
            UserType.Artist
        )

        if (changeRoleResult == null) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR);
            response.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            response.send(new ResponseData<any>({ data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR }));
        }

        response.status(HttpCode.OK);
        response.statusMessage = HttpMessage.OK;
        response.send(new ResponseData<any>({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK }));
    }





    //TODO: Change requirement from "query" to "param"
    /**
     * [get]
     * Select an user from database following id, transfer into DTO instance and return through HTTP/HTTPS response
     * @param request 
     * @returns 
     */
    @Get('find')
    @ApiOperation({ summary: '[Find user]: Get user information basing on user id without any requirements' })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - Ok]: Execute successfully and client has result',
        type: OkPersonResponseDto
    })
    @ApiResponse({
        status: HttpCode.NOT_FOUND,
        description: '[404 - Not found]: User account doesnt exist or be deleted',
        type: NotFoundExampleDto
    })

    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An error occured while executing client request',
        type: InternalServerErrorExampleDto
    })
    @ApiQuery({
        name: 'id',
        type: Number,
        description: 'The Id of searching user',
        required: true,
        example: 1
    })
    async find(@Query('id') userId: number, @Res() response: Response) {
        let responseData = null;
        try {
            this.logger.debug('[find]: id = ' + userId);
            if (!userId) throw new Error(HttpMessage.NOT_FOUND);

            let userInstance = await this.personService.getPerson(userId);
            this.logger.debug('[find]: userInstance = ' + userInstance);
            if (!userInstance) throw new Error(HttpMessage.NOT_FOUND);
            if (userInstance.personStatus == UserStatus.Deleted) throw new Error(HttpMessage.NOT_FOUND);

            let userResponseDto = this.personService.personToPersonDto(userInstance, PersonResponseDto.name);
            this.logger.debug('[find]: dto= ' + userResponseDto);
            responseData = new ResponseData<any>({
                data: userResponseDto,
                statusCode: HttpCode.OK,
                message: HttpMessage.OK
            });
        } catch (error) {
            switch (error.message) {
                case HttpMessage.NOT_FOUND: {
                    this.logger.error('[find]: Not found: User account doesnt exist in database or is deleted status');
                    this.logger.error(error);
                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.NOT_FOUND,
                        message: HttpMessage.NOT_FOUND
                    })
                    break;
                }
                default: {
                    this.logger.error('[find]: Internal server error: An error occurs when executing client request');
                    this.logger.error(error);
                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                        message: HttpMessage.INTERNAL_SERVER_ERROR
                    })
                    break;
                }
            }
        } finally {
            this.logger.log('[find]: Returning response data');
            response.statusCode = responseData.statusCode;
            response.statusMessage = responseData.statusMessage;
            response.send(responseData);
            return;
        }

    }





    // [Post]: CREATE new user with form data
    @Post()
    @ApiOperation({ summary: '[Create new user]: Create new user with form data' })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - Accept]: No error occurs, new user is created.',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.BAD_REQUEST,
        description: '[400 - Bad request]: Missing some parameters in form data which is sent by client.',
        type: BadRequestCreatePersonDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occurs on server when executing client request.',
        type: InternalServerErrorExampleDto
    })
    @ApiBody({
        description: 'Form data require these parameters: \n+ userEmail: string (email format)\n+ username: string\n+ userPassword: string',
        type: CreatePersonDto
    })
    @UsePipes(new CreatePersonValidation())
    @UseInterceptors(AnyFilesInterceptor())
    async createPerson(@Body() createPersonDto: CreatePersonDto, @Res() response: Response) {
        let responseData = null;
        try {
            console.log(createPersonDto);
            createPersonDto.userPassword = await this.hashService.encrypt(createPersonDto.userPassword);
            this.personService.createPerson({
                personName: createPersonDto.username,
                personEmail: createPersonDto.userEmail,
                personPassword: createPersonDto.userPassword,
                personType: UserType.User,
                personStatus: UserStatus.Alived
            })
            responseData = new ResponseData({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {
            switch (error.message) {
                default: {
                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                        message: HttpMessage.INTERNAL_SERVER_ERROR
                    })
                    break;
                }
            }
        } finally {
            response.statusCode = responseData.statusCode;
            response.statusMessage = responseData.message;
            response.send(responseData);
        }
    }

    @Put()
    @ApiOperation({ summary: '[Modify user]: Modify username and password with access token and form data' })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - Ok]: Updated user information.',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.BAD_REQUEST,
        description: '[400 - Bad request]: Missing required parameters or an unknown error occured while sending request.',
        type: BadRequestExampleDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorized]: Access Token is missing or user doesnt have permission to access this method.',
        type: BadRequestExampleDto
    })
    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occur when executing client request.',
        type: InternalServerErrorExampleDto
    })
    @ApiBody({
        description: 'Form data require either of these parameters:\n+ username: string\n+ password: string',
        type: UpdatePersonDto
    })
    @ApiBearerAuth('access-token')
    @UsePipes(new CreatePersonValidation())
    async update(@Body() updatePersonDto: UpdatePersonDto, @Req() request: Request) {
        this.logger.debug('[update]: ', 'A client request to update account.')
        let responseData = null;
        try {
            this.logger.debug('[update]: ', 'Getting access token')
            let accessToken = headerToToken(request);
            if (!accessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let userId = this.accessTokenService.decodeToUserId(accessToken);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            this.logger.debug('[update]: ', 'User id = ' + userId);
            this.logger.debug('[update]: ', 'User form data is below this line ');
            this.logger.debug(updatePersonDto);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance) throw new Error(HttpMessage.UNAUTHORIZED);

            this.logger.debug('[update]: Updating user');
            if (!updatePersonDto.username && !updatePersonDto.userPassword) throw new Error(HttpMessage.BAD_REQUEST);
            if (updatePersonDto.username)
                userInstance.personName = updatePersonDto.username;
            if (updatePersonDto.userPassword)
                userInstance.personPassword = await this.hashService.encrypt(updatePersonDto.userPassword);
            this.logger.debug('[update]: Updated');

            responseData = new ResponseData({ data: null, statusCode: HttpCode.OK, message: HttpMessage.OK });
        } catch (error) {
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: {
                    this.logger.error('[update]: ', 'Access token is invalid or user has no permission');
                    this.logger.error(error);
                    responseData = new ResponseData<null>({
                        data: null,
                        statusCode: HttpCode.UNAUTHORIZED,
                        message: HttpMessage.UNAUTHORIZED
                    });
                    break;
                }
                case HttpMessage.BAD_REQUEST: {
                    this.logger.error('[update]: ', 'Bad request because client sent form data without required field or some unknow error occurs');
                    responseData = new ResponseData<null>({
                        data: null,
                        statusCode: HttpCode.BAD_REQUEST,
                        message: HttpMessage.BAD_REQUEST
                    });
                    break;
                }
                default: {
                    responseData = new ResponseData<null>({
                        data: null,
                        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                        message: HttpMessage.INTERNAL_SERVER_ERROR
                    })
                }
            }
        } finally {
            response.statusCode = responseData.statusCode;
            response.statusMessage = responseData.statusMessage;
            response.send(responseData);
        }
    }






    // [Delete]: Delete Account with Bearer token (Access token) (Actually just change personStatus to Deleted)
    @ApiOperation({ summary: '[Delete user]: Delete user account (Change user status and User account still exists in database) <<Require: Access Token>>' })
    @ApiResponse({
        status: HttpCode.OK,
        description: '[200 - OK]: Everything is still okay bro.',
        type: OkExampleDto
    })
    @ApiResponse({
        status: HttpCode.UNAUTHORIZED,
        description: '[401 - Unauthorized]: Access token is missing/expired/invalid or User is not allowed to access this method.',
        type: OkExampleDto
    })

    @ApiResponse({
        status: HttpCode.NOT_FOUND,
        description: '[404 - Not found]: User account is not found or still in deleted status',
        type: OkExampleDto
    })

    @ApiResponse({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        description: '[500 - Internal server error]: An unknown error occured while excuting this client request.',
        type: OkExampleDto
    })
    @ApiBearerAuth('access-token')
    @Delete()
    async delete(@Req() request: Request): Promise<String> {
        let responseData: ResponseData<any> = null;
        try {
            let accessToken = headerToToken(request)
            if (!accessToken) throw new Error(HttpMessage.UNAUTHORIZED);

            let userId = this.accessTokenService.decodeToUserId(accessToken);
            if (userId == -404) throw new Error(HttpMessage.UNAUTHORIZED);

            let userInstance = await this.personService.getPerson(userId);
            if (!userInstance) throw new Error(HttpMessage.NOT_FOUND);

            if (userInstance.personStatus == UserStatus.Deleted) throw new Error(HttpMessage.NOT_FOUND);
            userInstance = await this.personService.changeStatus(userInstance, UserStatus.Deleted);
            if (!userInstance) throw new Error(HttpMessage.INTERNAL_SERVER_ERROR);

            responseData = new ResponseData<any>({
                data: null,
                statusCode: HttpCode.OK,
                message: HttpMessage.OK
            })
        } catch (error) {
            switch (error.message) {
                case HttpMessage.UNAUTHORIZED: {
                    this.logger.error('[delete]: Unauthorized! User doesnt have permission or access token is invalid');
                    this.logger.error(error);

                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.UNAUTHORIZED,
                        message: HttpMessage.UNAUTHORIZED
                    });
                    break;
                }
                case HttpMessage.NOT_FOUND: {
                    this.logger.error('[delete]: Cant find out user account in the database! User account maybe deleted or doenst exist. (User status is deleted case maybe occured');
                    this.logger.error(error);

                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.NOT_FOUND,
                        message: HttpMessage.NOT_FOUND
                    });
                    break;
                }
                default: {
                    this.logger.error('[delete]: Unknown error -> Internal server error, an error occurs and idk what happened bro');
                    this.logger.error(error);

                    responseData = new ResponseData<any>({
                        data: null,
                        statusCode: HttpCode.INTERNAL_SERVER_ERROR,
                        message: HttpMessage.INTERNAL_SERVER_ERROR
                    });
                }
            }
        } finally {
            response.statusCode = responseData.statusCode;
            response.statusMessage = responseData.message;
            response.send(responseData);
            return;
        }
    }


}
