import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinimarketController } from './controllers/minimarket/minimarket.controller';
import { MinimarketService } from './services/minimarket/minimarket.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "./entities/product.entity";
import {CategoryEntity} from "./entities/category.entity";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'mini-market',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      logging: true,
      entities: [ProductEntity, CategoryEntity],
    }),
      TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
  ],
  controllers: [AppController, MinimarketController],
  providers: [AppService, MinimarketService],
})
export class AppModule {}
