import { Injectable } from '@nestjs/common';
import mongoose from "mongoose";
import dotenv from "dotenv";
@Injectable()
class MongoService {

  constructor() {
    dotenv.config();
  }

  public async createMongoConnection () {
    return mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@localhost:27017`)
  }
}

export default MongoService;