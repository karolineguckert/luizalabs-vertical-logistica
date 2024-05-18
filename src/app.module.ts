import { Module } from '@nestjs/common';
import { MongoProvider } from './config/mongo.provider';
import {PurchaseController} from "./purchases/purchase.controller";

@Module({
  imports: [],
  controllers: [PurchaseController],
  providers: [MongoProvider],
})
export class AppModule {}
