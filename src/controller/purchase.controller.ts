import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import ManipulateFileService from "../business/manipulate.file.service";
import PurchaseBusiness from "../business/purchase.business";

@Controller("purchases")
export class PurchaseController {
  constructor(
    private purchaseBusiness: PurchaseBusiness,
    private manipulateFileService: ManipulateFileService,
  ) {}

  @Get("/orders")
  public async getAllPurchases() {
    return this.purchaseBusiness.getAllPurchases();
  }

  @Get("/orders/:orderId")
  public async getPurchaseByOrderId(@Param("orderId") orderId: number) {
    return this.purchaseBusiness.getPurchaseByOrderId(orderId);
  }

  @Get("/orders/:beginDate/:endDate")
  public async getPurchaseByDate(
    @Param("beginDate") beginDate: number,
    @Param("endDate") endDate: number,
  ) {
    return this.purchaseBusiness.getPurchaseByDate(beginDate, endDate);
  }

  @Post("/")
  @UseInterceptors(FileInterceptor("file"))
  public async createPurchases(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(
        "The current file is empty!",
        HttpStatus.BAD_REQUEST,
      );
    }
    const contentOfFile = file.buffer.toString();

    return this.manipulateFileService.createPurchasesFromContentOfFile(
      contentOfFile,
    );
  }
}
