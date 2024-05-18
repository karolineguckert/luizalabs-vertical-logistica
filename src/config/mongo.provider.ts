import mongoose from "mongoose";
import dotenv from "dotenv";
class MongoProvider {

  constructor() {
    dotenv.config();
  }

  public async createMongoConnection () {
    return mongoose.connect(`mongodb://${process.env.USER}:${process.env.PASSWORD}@localhost:27017`)
  }
}

export const mongoProviders = [
  {
    provide: 'MONGO_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => new MongoProvider().createMongoConnection(),
  },
];