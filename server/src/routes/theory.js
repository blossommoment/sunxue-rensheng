import { Router } from "express";
import { quiz } from "../data/quiz.js";
import { QuizResult } from "../models/QuizResult.js";
import { User } from "../models/User.js";

const router = Router();

router.get("/quiz", (req, res) => {
  res.json({ questions: quiz });
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
      user.totalScore = user.theoryScore;
      await user.save();
    }
  }

  const details = quiz.map((q) => ({
    id: q.id,
    title: q.title,
    correct: q.answer,
    chosen: answers?.[q.id] || null,
    explain: q.explain
  }));

  res.json({ score, details });
});

export default router;

