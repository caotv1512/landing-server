import { Module } from '@nestjs/common';
import { ProductCustomerService } from './product-customer.service';
import { ProductCustomerController } from './product-customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCustomer } from './database/product-customer.entity';
import { Category } from '../category/database/category.entity';
import { CategoryModule } from '../category/category.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductCustomer, Category]),
    CategoryModule,
    CloudinaryModule,
  ],
  controllers: [ProductCustomerController],
  providers: [ProductCustomerService],
  exports: [ProductCustomerService],
})
export class ProductCustomerModule {}
