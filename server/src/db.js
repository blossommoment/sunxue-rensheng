import mongoose from "mongoose";
import Redis from "ioredis";
import { config } from "./config.js";

export async function connectMongo() {
  await mongoose.connect(config.mongoUrl);
}

export function createRedis() {
  if (!config.redisUrl) return null;
  return new Redis(config.redisUrl);
}
