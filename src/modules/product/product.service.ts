import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Product } from './database/product.entity';
import { ProductDto } from './dto/product.dto';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(data: ProductDto) {
    const product = this.productRepo.create(data);
    await this.productRepo.save(product);
    return product;
  }

  async findAll() {
    const data = await this.productRepo.find();
    console.log(data);
    return data;
  }

  async findOnly(id) {
    const product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return product;
    } catch (err) {
      throw new BadRequestException({ action: 'find product data' });
    }
  }

  async update(id: number, data: ProductDto) {
    let product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Id not found.');
    }
    try {
      product.title = data.title;
      product.image = data.image;
      product.price = data.price;
      product.description = data.description;
      await this.productRepo.update({ id }, product);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: product,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find product data' });
    }
  }
}
