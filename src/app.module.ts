import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MinimarketController } from './controllers/minimarket/minimarket.controller';
import { MinimarketService } from './services/minimarket/minimarket.service';

@Module({
  imports: [],
  controllers: [AppController, MinimarketController],
  providers: [AppService, MinimarketService],
})
export class AppModule {}
