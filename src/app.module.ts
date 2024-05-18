import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongoService } from './config/mongo.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [MongoService],
})
export class AppModule {}
