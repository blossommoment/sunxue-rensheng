import { Router } from "express";
import { User } from "../models/User.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "name required" });
  let user = await User.findOne({ name });
  if (!user) user = await User.create({ name });
  res.json({ user });
});

export default router;
