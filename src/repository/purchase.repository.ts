import { Model } from "mongoose";
import PurchaseInterface from "../entity/purchase.entity";

class PurchaseRepository {
  constructor(private purchaseModel: Model<PurchaseInterface>) {}
  public async getPurchaseByOrderId(orderId: number) {
    return this.purchaseModel.find({ orderId: orderId }).exec();
  }

  public async getPurchaseByDate(beginDate: number, endDate: number) {
    return this.purchaseModel
      .find({ date: { $gte: beginDate, $lte: endDate } })
      .exec();
  }

  public async getAllPurchases() {
    return this.purchaseModel.find().exec();
  }

  public async createPurchase(
    userId: number,
    userName: string,
    orderId: number,
    productId: number,
    value: number,
    date: number,
  ) {
    return this.purchaseModel.create({
      userId: userId,
      userName: userName,
      orderId: orderId,
      productId: productId,
      value: value,
      date: date,
    });
  }
}
export default PurchaseRepository;
