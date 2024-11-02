import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('cats')

export class CatsController {

  @Get()
  getCats(): string {
    return "Get cat"
  }

  @Post()
  createCats(): string {
    return "Create cat"
  }

  @Put()
  updateCats(): string {
    return "Update cat"
  }

  @Delete('/:id')
  deleteCats(): string {
    return "Delete cat"
  }
}