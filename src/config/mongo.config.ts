import mongoose from "mongoose";
import * as dotenv from "dotenv";

export class MongoConfig {

  constructor() {
    dotenv.config();
  }

  public async createMongoConnection () {
    //TODO: Colocar a database na url
    return mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.MONGO_PORT}`)
  }
}