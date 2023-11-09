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
import { getRepository } from 'typeorm';
import { Category } from '../category/database/category.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(file, data: ProductDto) {
    const category = await this.categoryRepo.findOne({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new Error('Invalid categoryId');
    }
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
      category: category,
    };
    this.productRepo.create(product);
    await this.productRepo.save(product);
    return product;
  }

  async findAll() {
    const data = await this.productRepo.find({ relations: ['category'] });
    return data.map((item) => {
      return {
        ...item,
        category: item.category.id
      }
    })
    // console.log(newData);
    // return data;
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
        message: 'Delete Product successfully',
        productId: id,
      };
    }
    throw new BadRequestException({ action: 'Can not find product data' });
  }

  async update(id: number,file, data) {
    let product = await this.productRepo.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Id not found.');
    }
    try {
      product.title = data.title;
      product.image = file;
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
