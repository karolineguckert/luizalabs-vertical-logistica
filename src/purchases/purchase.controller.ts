import {Controller, Get, Param} from '@nestjs/common';
import {PurchaseService} from "./purchase.service";

@Controller('purchases')
export class PurchaseController {

    constructor(private purchaseService: PurchaseService) {
    }
    @Get('/orders')
    getAllPurchases() {
        return this.purchaseService.getAllPurchases();
    }

    @Get('/orders/:orderId')
    getPurchaseByOrderId(@Param('id') id: number) {
        return this.purchaseService.getPurchaseByOrderId(id);
    }
}