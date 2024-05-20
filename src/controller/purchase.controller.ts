import {Controller, Get, HttpException, HttpStatus, Param, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import PurchaseBusiness from "../business/purchase.business";
import {FileInterceptor} from "@nestjs/platform-express";
import { Express } from 'express'
import ManipulateFileService from "../business/manipulate.file.service";

@Controller('purchases')
export class PurchaseController {

    constructor(private purchaseBusiness: PurchaseBusiness,
                private manipulateFileService: ManipulateFileService) {
    }

    @Get('/orders')
    public async getAllPurchases() {
        const purchases = await this.purchaseBusiness.getAllPurchases();
        return JSON.parse(JSON.stringify(purchases)); // TODO ver os JSON.
    }

    @Get('/orders/:orderId')
    public async getPurchaseByOrderId(@Param('orderId') orderId: number) {
        const purchase = await this.purchaseBusiness.getPurchaseByOrderId(orderId);
        return JSON.parse(JSON.stringify(purchase)); // TODO ver os JSON.
    }

    @Get('/orders/:beginDate/:endDate')
    public async getPurchaseByDate(@Param('beginDate') beginDate: number, @Param('endDate') endDate: number){
        const purchases = await this.purchaseBusiness.getPurchaseByDate(beginDate, endDate);
        return JSON.parse(JSON.stringify(purchases)); // TODO ver os JSON.
    }

    @Post('/')
    @UseInterceptors(FileInterceptor('file'))
    public async createPurchases(@UploadedFile() file: Express.Multer.File){
        if(!file){
            throw new HttpException("The current file is empty!", HttpStatus.BAD_REQUEST);
        }
        const contentOfFile = file.buffer.toString();

        const purchase = await this.manipulateFileService.createPurchasesFromContentOfFile(contentOfFile);
        return JSON.stringify(purchase); // TODO ver os JSON.
    }
}