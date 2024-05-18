import { Connection } from 'mongoose';
import {purchaseSchema} from "./purchase.schema";

export const purchasesProviders = [
    {
        provide: 'PURCHASE_MODEL',
        useFactory: (connection: Connection) => connection.model('purchase', purchaseSchema),
        inject: ['MONGO_CONNECTION'],
    },
];