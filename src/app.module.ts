import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './controllers/product/product.controller';
import { MinimarketService } from './services/minimarket/minimarket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "./entities/product.entity";
import {CategoryEntity} from "./entities/category.entity";
import { CategoryController } from './controllers/category/category.controller';
import { ProductService } from './services/product/product.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'mini_market',
      username: 'devuser',
      password: 'devpassword',
      synchronize: true,
      logging: true,
      entities: [ProductEntity, CategoryEntity],
    }),
      TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  controllers: [AppController, ProductController, CategoryController],
  providers: [AppService, MinimarketService, ProductService],
})
export class AppModule {}
