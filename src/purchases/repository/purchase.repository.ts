import PurchaseEntity from "../entity/purchase";
import {Model} from "mongoose";
import {Inject} from "@nestjs/common";

class PurchaseRepository {

    constructor(@Inject('PURCHASE_MODEL')
                private purchaseModel: Model<PurchaseEntity>) {
    }
    public async getPurchaseByOrderId (orderId: number) {
        return this.purchaseModel.find({orderId: orderId}).exec();
    }

    public async getPurchaseByDate (beginDate: number, endDate: number) {
        return this.purchaseModel.find({date: {$gte: beginDate, $lte: endDate}}).exec();
    }

    public async getAllPurchases () {
        return this.purchaseModel.find().exec();
    }

    public async createPurchase (userId: number,
                                 userName: string,
                                 orderId: number,
                                 productId: number,
                                 value: number,
                                 date: number) {

        return this.purchaseModel.create({
            userId: userId,
            userName: userName,
            orderId: orderId,
            productId: productId,
            value: value,
            date: date
        });
    }

}
export default PurchaseRepository;