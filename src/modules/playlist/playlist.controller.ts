import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('playlist')
export class PlaylistController {
    @Post()
    create(){}

    @Put()
    put(){}

    @Delete()
    _delete(){}
}
