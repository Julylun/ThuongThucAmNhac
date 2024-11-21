import { Controller, Delete, Get, Post, Put} from '@nestjs/common';

@Controller('person')
export class PersonController {
    @Get()
    getAll(): string {
        return "Get all person";
    }

    @Get(':id')
    get(): String {
        return 'Get a person';
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
