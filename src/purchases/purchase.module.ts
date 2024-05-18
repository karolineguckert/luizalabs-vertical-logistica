import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import {purchasesProviders} from "./entity/purchase.providers";

@Module({
    controllers: [PurchaseController],
    providers: [PurchaseService, ...purchasesProviders],
})
export class PurchaseModule {}