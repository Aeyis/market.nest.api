import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './controllers/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { CategoryEntity } from './entities/category.entity';
import { UserEntity } from './entities/user.entity';
import { CategoryController } from './controllers/category/category.controller';
import { AuthController } from './controllers/auth.controller';
import { CategoryService } from './services/category/category.service';
import { ProductService } from './services/product/product.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LoginMiddleware } from './middlewares/login.middleware';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserService } from './services/user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT!,
      database: process.env.PG_DATABASE,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      synchronize: true,
      logging: true,
      entities: [ProductEntity, CategoryEntity, UserEntity],
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity, UserEntity]),
  ],
  controllers: [
    AppController,
    ProductController,
    CategoryController,
    AuthController,
  ],
  providers: [AppService, CategoryService, ProductService, UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
