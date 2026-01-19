import { Router } from "express";
import { User } from "../models/User.js";
import { buildRadar, calcTitle } from "../utils/score.js";

const router = Router();

router.get("/:userId", async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: "not found" });
  const radar = buildRadar(user.theoryScore, user.practiceScore);
  res.json({
    theoryScore: user.theoryScore,
    practiceScore: user.practiceScore,
    totalScore: user.totalScore,
    title: calcTitle(user.totalScore),
    radar
  });
});

export default router;
