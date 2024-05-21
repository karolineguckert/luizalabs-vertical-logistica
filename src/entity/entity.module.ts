import { Global, Module } from "@nestjs/common";
import { Connection } from "mongoose";
import { PurchaseEntity } from "./purchase.entity";

@Global()
@Module({
  exports: ["PURCHASE_MODEL"],
  providers: [
    {
      provide: "PURCHASE_MODEL",
      useFactory: (connection: Connection) =>
        connection.model("purchase", PurchaseEntity),
      inject: ["MONGO_CONNECTION"],
    },
  ],
})
export class EntityModule {}
