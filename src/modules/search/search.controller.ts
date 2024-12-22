import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService){}

    @Get()
    searchByQuery(@Query('key') searchKey: string, @Query('page') page: number) {
        this.searchService.getSimilarData(searchKey,page,15);
    }
}
