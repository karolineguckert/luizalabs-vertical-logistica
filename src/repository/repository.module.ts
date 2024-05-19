import {Global, Module} from "@nestjs/common";
import PurchaseInterface from "../entity/purchase.entity";
import {Model} from "mongoose";
import PurchaseRepository from "./purchase.repository";

@Global()
@Module({
    exports: [PurchaseRepository],
    providers: [
        {
            inject: ['PURCHASE_MODEL'],
            provide: PurchaseRepository,
            useFactory: (entity: Model<PurchaseInterface>) => new PurchaseRepository(entity),
        }
    ]
})
export class RepositoryModule {}