import { Router } from "express";
import { quotes } from "../data/quotes.js";

const router = Router();

const challenges = [
  "用一句话把今天的工作包装成区块链级大事",
  "在群里发一个赢学宣言",
  "把迟到理由写成发布会标题",
  "用三句话说服朋友相信你要上火星"
];

router.get("/", (req, res) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)].text;
  const challenge = challenges[Math.floor(Math.random() * challenges.length)];
  res.json({ quote, challenge, tip: "记住：热度不能守恒，只能扩散。" });
});

export default router;
