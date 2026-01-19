import { Router } from "express";
import { SimulationResult } from "../models/SimulationResult.js";
import { User } from "../models/User.js";

const router = Router();

const events = [
  "职场突然被裁，但你的名字上了热搜",
  "一位神秘大佬邀请你共建概念宇宙",
  "项目爆火三天后被质疑，你决定反手开发布会",
  "社区被割韭菜，你选择发长文自救",
  "发现椰子鸡店要上市，你准备All in"
];

const endings = [
  "你成功把风波变成流量池，赢麻了",
  "你被封为社区精神领袖，热度不减",
  "你在争议中存活，成为传奇案例",
  "你把失败包装成教程，收获全网掌声"
];

router.post("/run", async (req, res) => {
  const { userId } = req.body;
  const event = events[Math.floor(Math.random() * events.length)];
  const score = 60 + Math.floor(Math.random() * 40);
  const paths = [
    { title: "高调撒币", outcome: "全网讨论你三天" },
    { title: "发布概念白皮书", outcome: "赢得关注与质疑双倍" },
    { title: "沉默一天再开直播", outcome: "口碑反转，打脸式出圈" }
  ];
  const ending = endings[Math.floor(Math.random() * endings.length)];
  await SimulationResult.create({ userId, event, score, ending });
  if (userId) {
    const user = await User.findById(userId);
    if (user) {
      user.practiceScore = Math.max(user.practiceScore, score);
      user.totalScore = user.theoryScore + user.practiceScore;
      await user.save();
    }
  }
  res.json({ event, paths, score, ending });
});

export default router;
