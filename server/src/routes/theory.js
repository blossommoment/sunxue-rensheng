import { Router } from "express";
import { quiz } from "../data/quiz.js";
import { knowledgeMap } from "../data/knowledgeMap.js";
import { QuizResult } from "../models/QuizResult.js";
import { User } from "../models/User.js";

const router = Router();

router.get("/quiz", (req, res) => {
  res.json({ questions: quiz });
});

router.get("/map", (req, res) => {
  res.json({ nodes: knowledgeMap });
});

router.post("/submit", async (req, res) => {
  const { userId, answers } = req.body;
  const correct = quiz.reduce((acc, q) => acc + (answers?.[q.id] === q.answer ? 10 : 0), 0);
  const score = Math.min(100, correct);
  await QuizResult.create({ userId, answers, score });
  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      user.theoryScore = Math.max(user.theoryScore, score);
      user.totalScore = user.theoryScore + user.practiceScore;
      await user.save();
    }
  }
  const mastery = knowledgeMap.filter((_, idx) => idx * 16 < score).map((n) => n.id);
  res.json({ score, mastery });
});

export default router;
