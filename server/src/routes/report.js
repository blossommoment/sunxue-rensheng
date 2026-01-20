import { Router } from "express";
import { User } from "../models/User.js";
import { calcTitle } from "../utils/score.js";

const router = Router();

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "not found" });
  res.json({
    theoryScore: user.theoryScore,
    totalScore: user.totalScore,
    title: calcTitle(user.totalScore)
  });
});

export default router;

