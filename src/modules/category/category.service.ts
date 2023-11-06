import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Timestamp } from 'typeorm';
import { Category } from './database/category.entity';
import { CategoryDto } from './dto/category.dto';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(data: CategoryDto) {
    const category = this.categoryRepo.create(data);
    await this.categoryRepo.save(category);
    return category;
  }

  async findAll() {
    const data = await this.categoryRepo.find();
    console.log(data);
    return data;
  }

  async findOnly(id) {
    const category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Id not found.');
    }
    try {
      return category;
    } catch (err) {
      throw new BadRequestException({ action: 'find category data' });
    }
  }

  async update(id: number, data: CategoryDto) {
    let category = await this.categoryRepo.findOne({ where: { id: id } });
    if (!category) {
      throw new NotFoundException('Id not found.');
    }
    try {
      category.name = data.name;
      await this.categoryRepo.update({ id }, category);
      return {
        statusCode: HttpStatus.OK,
        message: 'User updated successfully',
        data: category,
      };
    } catch (err) {
      throw new BadRequestException({ action: 'find category data' });
    }
  }
}
