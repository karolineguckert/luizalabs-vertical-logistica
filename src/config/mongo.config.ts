import mongoose from "mongoose";
import * as dotenv from "dotenv";

export class MongoConfig {

  constructor() {
    dotenv.config();
  }

  public async createMongoConnection () {
    //TODO: Colocar host e port na env também
    //TODO: Colocar a database na url
    return mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@localhost:27018`)
  }
}