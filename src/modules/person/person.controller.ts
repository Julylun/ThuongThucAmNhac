import { Controller, Delete, Get, Post, Put, Req, Res} from '@nestjs/common';
import { PersonService } from './person.service';
import { Request, Response, response } from 'express';
import { ResponseData } from 'src/common/class.global';
import { HttpCode, HttpMessage } from 'src/common/enum.global';
import { AccesstokenService } from '../auth/accesstoken/accesstoken.service';
import { PersonDataDto } from './dto/persondata.dto';
import { UserType } from './person.enum';
import { headerToToken} from 'src/common/function.global';

@Controller('/api/user')
export class PersonController {
    constructor(
        private personService: PersonService,
        private accessTokenService: AccesstokenService
    ) { }


    // User use access tokken to get user data
    @Get()
    getUser(@Req() request: Request, @Res() response: Response): any {
        const unauthorizedResponse = new ResponseData<any>({data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED});
        const authHeader = request.headers['authorization'];
        if(authHeader && authHeader.startsWith('Bearer ')){
           const token = authHeader.slice(7, authHeader.length);
        
           let decodedTokenData = this.accessTokenService.decode(token);
           if(decodedTokenData == null) return unauthorizedResponse;
           let personId = decodedTokenData.sub;
           this.personService.getPerson(personId).then((person) => {
               if(person == null) return unauthorizedResponse;
               response.status(HttpCode.OK);
               response.statusMessage = HttpMessage.OK;
               response.send(new ResponseData<PersonDataDto>({data: this.personService.personObjectToPersonDataDto(person), statusCode: HttpCode.OK, message: HttpMessage.OK}))
           });
        }
        response.status(unauthorizedResponse.statusCode);
        response.statusMessage = unauthorizedResponse.message;
        response.send(unauthorizedResponse);
    }

    @Put('/to_artist')
    async changeRoleToArtist(@Req() request: Request, @Res() response: Response): Promise<any> {
        let accessToken = headerToToken(request);

        if(accessToken == null) {
            response.status(HttpCode.UNAUTHORIZED);
            response.statusMessage = HttpMessage.UNAUTHORIZED;
            response.send(new ResponseData<any>({data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED}));
        }

        let userId = this.accessTokenService.decodeToUserId(accessToken);

        if(userId == -404) {
            response.status(HttpCode.UNAUTHORIZED);
            response.statusMessage = HttpMessage.UNAUTHORIZED;
            response.send(new ResponseData<any>({data: null, statusCode: HttpCode.UNAUTHORIZED, message: HttpMessage.UNAUTHORIZED}));
        }
        if(userId == -500) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR);
            response.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            response.send(new ResponseData<any>({data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR}));
        }

        
        let changeRoleResult = await this.personService.changeRole(
            await this.personService.getPerson(userId),
            UserType.Artist
        )

        if(changeRoleResult == null) {
            response.status(HttpCode.INTERNAL_SERVER_ERROR);
            response.statusMessage = HttpMessage.INTERNAL_SERVER_ERROR;
            response.send(new ResponseData<any>({data: null, statusCode: HttpCode.INTERNAL_SERVER_ERROR, message: HttpMessage.INTERNAL_SERVER_ERROR}));
        }

        response.status(HttpCode.OK);
        response.statusMessage = HttpMessage.OK;
        response.send(new ResponseData<any>({data: null, statusCode: HttpCode.OK, message: HttpMessage.OK}));
    }

    @Get(':id')
    get(): String {
        return 'Get person';
    }

    @Post()
    create(): String {
        return 'Create person';
    }

    @Put()
    update(): String {
        return 'Update person'
    }

    @Delete(':id')
    delete(): String {
        return 'Delete person'
    }


}
