import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { ProductCustomer } from './database/product-customer.entity';
import { ProductCustomerDto } from './dto/product-customer.dto';
import { getRepository } from 'typeorm';
import { Category } from '../category/database/category.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class ProductCustomerService {
  constructor(
    @InjectRepository(ProductCustomer)
    private productRepo: Repository<ProductCustomer>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(file, data: ProductCustomerDto) {
    const image = await this.cloudinaryService.uploadFile(file);
    const product = {
      title: data.title,
      image: image?.url || '',
      price: data.price,
      description: data.description,
      discount: data.discount,
      quantity: data.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.productRepo.create(product);
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

  async delete(id) {
    console.log(id, 'id');

    const product = await this.productRepo.findOne({ where: { id: id } });
    console.log(product, 'product');
    if (!product) {
      throw new NotFoundException('Id not found.');
    }

    const data = await this.productRepo.delete(id);
    console.log(data);

    if (data.affected) {
      return {
        message: 'Delete ProductCustomer successfully',
        productId: id,
      };
    }
    throw new BadRequestException({ action: 'Can not find product data' });
  }

  async update(id: number, data: ProductCustomerDto) {
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
