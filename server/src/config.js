import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5175,

  mongoUrl: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/sunxue",
  redisUrl: process.env.REDIS_URL || ""
};
