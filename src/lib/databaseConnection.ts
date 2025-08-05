import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI as string;


type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};


declare global {
  var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async (): Promise<Mongoose> => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "saree-commerce-db",
      bufferCommands: false,
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
