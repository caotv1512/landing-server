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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getAll() {
    return this.productService.findAll();
  }

  @Post('/')
  @UseGuards()
  @UseInterceptors(FileInterceptor('file'))
  async createUsers(@UploadedFile() file: Express.Multer.File, @Body() data) {
    console.log(file, 'ahihi');
    const newProduct: ProductDto = {
      title: data.title,
      image: 'file',
      price: Number(data.price),
      description: data.description,
      discount: +data.discount,
      quantity: +data.quantity,
      categoryId: +data.categoryId,
    };

    const product = await this.productService.create(file, newProduct);
    return {
      statusCode: HttpStatus.OK,
      message: 'product created successfully',
      product,
    };
  }

  @Get('/:id')
  getOnly(@Param() id) {
    return this.productService.findOnly(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: ProductDto) {
    return await this.productService.update(id, data);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id) {
    return this.productService.delete(+id);
  }
}
