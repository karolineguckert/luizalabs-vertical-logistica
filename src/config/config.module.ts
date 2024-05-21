import { Global, Module } from "@nestjs/common";
import { MongoConfig } from "./mongo.config";
import mongoose from "mongoose";

@Global()
@Module({
  exports: ["MONGO_CONNECTION"],
  providers: [
    {
      provide: "MONGO_CONNECTION",
      useFactory: (): Promise<typeof mongoose> =>
        new MongoConfig().createMongoConnection(),
    },
  ],
})
export class ConfigModule {}
