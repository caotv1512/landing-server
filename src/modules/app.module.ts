import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GoogleStrategy } from './auth/google.strategy';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductCustomerModule } from './product-customer/product-customer.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ProductModule, ProductCustomerModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, CloudinaryService],
})
export class AppModule {}
