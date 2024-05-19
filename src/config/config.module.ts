
import {Global, Module} from '@nestjs/common';
import mongoose from "mongoose";
import {MongoConfig} from "./mongo.config";

@Global()
@Module({
    exports: ['MONGO_CONNECTION'],
    providers: [
        {
            provide: 'MONGO_CONNECTION',
            useFactory: (): Promise<typeof mongoose> => new MongoConfig().createMongoConnection(),
        }
    ],
})
export class ConfigModule {}