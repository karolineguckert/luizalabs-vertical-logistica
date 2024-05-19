import {Global, Module} from "@nestjs/common";
import PurchaseBusiness from "./purchase.business";
import PurchaseRepository from "../repository/purchase.repository";

@Global()
@Module({
    exports: [PurchaseBusiness],
    providers: [
        {
            inject: [PurchaseRepository],
            provide: PurchaseBusiness,
            useFactory: (repository: PurchaseRepository) => new PurchaseBusiness(repository),
        }
    ]
})
export class BusinessModule {}