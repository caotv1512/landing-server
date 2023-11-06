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

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, ProductModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy, CloudinaryService],
})
export class AppModule {}
