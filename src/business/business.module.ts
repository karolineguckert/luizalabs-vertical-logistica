import {Global, Module} from "@nestjs/common";
import PurchaseBusiness from "./purchase.business";
import PurchaseRepository from "../repository/purchase.repository";
import ManipulateFileService from "./manipulate.file.service";

@Global()
@Module({
    exports: [PurchaseBusiness, ManipulateFileService],
    providers: [
        {
            inject: [PurchaseRepository],
            provide: PurchaseBusiness,
            useFactory: (repository: PurchaseRepository) => new PurchaseBusiness(repository),
        },
        {
            inject: [PurchaseBusiness],
            provide: ManipulateFileService,
            useFactory: (business: PurchaseBusiness) => new ManipulateFileService(business),
        }
    ]
})
export class BusinessModule {}