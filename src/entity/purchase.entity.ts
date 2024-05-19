import mongoose from "mongoose";

export default interface PurchaseInterface {
    userId: number;
    userName: string;
    orderId: number;
    productId: number;
    value:  number,
    date: number;
}

export const PurchaseEntity = new mongoose.Schema<PurchaseInterface>({
    userId: { type: Number, required: true, size: 10 },
    userName: { type: String, required: true, size: 45 },
    orderId: { type: Number, required: true, size: 10 },
    productId: { type: Number, required: true, size: 10 },
    value: { type: Number, required: true, size: 12 },
    date: { type: Number, required: true, size: 8 }
});