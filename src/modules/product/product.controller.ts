import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  Delete,
  Patch,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getAll() {
    return this.productService.findAll();
  }



  @Get('/:id')
  getOnly(@Param() id) {
    return this.productService.findOnly(id);
  }

  @Put('/:id')
  @UseGuards()
  @UseInterceptors(FileInterceptor('file'))
  async updateUser(@UploadedFile() file: Express.Multer.File,@Param('id') id: number, @Body() data: ProductDto) {
    const newProduct: ProductDto = {
      title: data.title,
      image: 'file',
      price: Number(data.price),
      description: data.description,
      discount: +data.discount || 0,
      quantity: +data.quantity || 0,
      categoryId: +data.categoryId || 0,
    };
    return await this.productService.update(id, file, newProduct);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id) {
    return this.productService.delete(+id);
  }
}
