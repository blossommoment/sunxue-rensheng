export function calcTitle(totalScore) {
  if (totalScore >= 90) return "孙学宗师 / 首席赢家";
  if (totalScore >= 70) return "孙学高级弟子 / 赢麻了";
  if (totalScore >= 50) return "孙学潜力股 / 正在赢的路上";
  return "孙学萌新 / 先把饭吃饱再谈赢";
}

export function buildRadar(theoryScore, practiceScore) {
  const base = Math.min(100, Math.round((theoryScore + practiceScore) / 2));
  return [
    { metric: "勤奋轴", score: Math.min(100, base + 10) },
    { metric: "营销轴", score: Math.min(100, base + 5) },
    { metric: "致富轴", score: Math.min(100, base) },
    { metric: "行动力轴", score: Math.min(100, base + 12) }
  ];
}
