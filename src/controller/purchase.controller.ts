import {Body, Controller, Get, Param, Post, RawBodyRequest, Req, UploadedFile, UseInterceptors} from '@nestjs/common';
import PurchaseBusiness from "../business/purchase.business";
import {FileInterceptor} from "@nestjs/platform-express";
import { Express } from 'express'
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
    @Get('/orders/:beginDate/:endDate')
    public async getPurchaseByDate(@Param('beginDate') beginDate: number, @Param('endDate') endDate: number){
        const purchases = await this.purchaseBusiness.getPurchaseByDate(beginDate, endDate);
        return JSON.parse(JSON.stringify(purchases));
    }
    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    public async createPurchases(@UploadedFile() file: Express.Multer.File){
        //TODO Adicionar mensagem de erro
        console.log("aaa", file)
        if(file){
            const contentOfFile = file.buffer.toString();
            console.log("ui", file.buffer.toString())

            const purchase = await this.purchaseBusiness.createPurchases(contentOfFile);
            return JSON.stringify(purchase);
        }


    }
}