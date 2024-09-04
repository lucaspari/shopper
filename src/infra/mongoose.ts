const mongoose = require("mongoose");

class MongooseSingleton {
  private static instance: MongooseSingleton;
  private connection: any;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getInstance(): MongooseSingleton {
    if (!MongooseSingleton.instance) {
      MongooseSingleton.instance = new MongooseSingleton();
    }
    return MongooseSingleton.instance;
  }

  public async connect(): Promise<void> {
    if (!this.connection) {
      this.connection = await mongoose.connect(process.env.MONGO_URL);
    }
  }

  public getConnection(): any {
    if (!this.connection) {
      throw new Error("Mongoose connection has not been established");
    }
    return this.connection;
  }
}

export default MongooseSingleton;
