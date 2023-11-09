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
import { ProductCustomerDto } from './dto/product-customer.dto';
import { ProductCustomerService } from './product-customer.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product-customer')
export class ProductCustomerController {
  constructor(private readonly productCustomerService: ProductCustomerService) {}

  @Get('/')
  getAll() {
    return this.productCustomerService.findAll();
  }

  @Post('/')
  @UseGuards()
  @UseInterceptors(FileInterceptor('file'))
  async createUsers(@UploadedFile() file: Express.Multer.File, @Body() data) {
    const newProductCustomer: ProductCustomerDto = {
      title: data.title,
      image: 'file',
      price: Number(data.price),
      description: data.description,
      discount: +data.discount || 0,
      quantity: +data.quantity || 0,
      categoryId: +data.categoryId || 0,
    };

    const productCustomer = await this.productCustomerService.create(file, newProductCustomer);
    return {
      statusCode: HttpStatus.OK,
      message: 'productCustomer created successfully',
      productCustomer,
    };
  }

  @Get('/:id')
  getOnly(@Param() id) {
    return this.productCustomerService.findOnly(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() data: ProductCustomerDto) {
    return await this.productCustomerService.update(id, data);
  }

  @Delete('/:id')
  deleteProductCustomer(@Param('id') id) {
    return this.productCustomerService.delete(+id);
  }
}
