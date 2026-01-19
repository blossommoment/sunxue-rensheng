import { Router } from "express";
import { User } from "../models/User.js";

const router = Router();

router.get("/", async (req, res) => {
  const redis = req.app.locals.redis;
  if (redis) {
    const cached = await redis.get("leaderboard");
    if (cached) return res.json(JSON.parse(cached));
  }
  const items = await User.find().sort({ totalScore: -1 }).limit(50);
  const payload = { items };
  if (redis) await redis.setex("leaderboard", 30, JSON.stringify(payload));
  res.json(payload);
});


export default router;
