import { Router } from "express";
import { Contribution } from "../models/Contribution.js";

const router = Router();

router.post("/", async (req, res) => {
  const { userId, text } = req.body;
  if (!text) return res.status(400).json({ message: "text required" });
  const item = await Contribution.create({ userId, text });
  res.json({ item });
});

export default router;
