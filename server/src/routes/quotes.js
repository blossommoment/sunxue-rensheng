import { Router } from "express";
import { quotes } from "../data/quotes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ items: quotes });
});

export default router;
