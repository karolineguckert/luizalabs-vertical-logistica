import * as dotenv from "dotenv";
import mongoose from "mongoose";

export class MongoConfig {
  constructor() {
    dotenv.config();
  }

  public async createMongoConnection() {
    //TODO: Colocar a database na url
    return mongoose.connect(
      `mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.MONGO_PORT}`,
    );
  }
}
