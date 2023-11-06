import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Patch, UseGuards } from '@nestjs/common/decorators';
import { CategoryDto } from './dto/category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  getAll() {
    return this.categoryService.findAll();
  }

  @Post('/')
  @UseGuards()
  async createUsers(@Body() data: CategoryDto) {
    const category = await this.categoryService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'category created successfully',
      category,
    };
  }

  @Get('/:id')
  getOnly(@Param() id) {
    return this.categoryService.findOnly(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: CategoryDto) {
    return await this.categoryService.update(id, data);
  }
}
