import {Controller, Get, Param} from '@nestjs/common';
import PurchaseBusiness from "../business/purchase.business";

@Controller('purchases')
export class PurchaseController {

    constructor(private purchaseBusiness: PurchaseBusiness) {
    }
    @Get('/orders')
    public async getAllPurchases() {
        const purchases = await this.purchaseBusiness.getAllPurchases();
        return JSON.parse(JSON.stringify(purchases));
    }

    @Get('/orders/:orderId')
    public async getPurchaseByOrderId(@Param('orderId') orderId: number) {
        const purchase = await this.purchaseBusiness.getPurchaseByOrderId(orderId);
        return JSON.parse(JSON.stringify(purchase));
    }

    // public async getPurchaseByDate(beginDate: number, endDate: number){
    //     const purchases = await this.purchaseBusiness.getPurchaseByDate(beginDate, endDate);
    //     return JSON.parse(JSON.stringify(purchases));
    // }
    //
    // public async createPurchases(text: string){
    //     const purchase = await this.purchaseBusiness.createPurchases(text);
    //     return JSON.stringify(purchase);
    // }
}