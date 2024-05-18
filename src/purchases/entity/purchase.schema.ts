import mongoose from "mongoose";
import PurchaseEntity from "./purchase.entity";

export const purchaseSchema = new mongoose.Schema<PurchaseEntity>({
    userId: { type: Number, required: true, size: 10 },
    userName: { type: String, required: true, size: 45 },
    orderId: { type: Number, required: true, size: 10 },
    productId: { type: Number, required: true, size: 10 },
    value: { type: Number, required: true, size: 12 },
    date: { type: Number, required: true, size: 8 }
});