export function calcTitle(totalScore) {
  if (totalScore >= 90) return "孙学宗师 / 首席赢家";
  if (totalScore >= 70) return "孙学高级弟子 / 赢麻了";
  if (totalScore >= 50) return "孙学潜力股 / 正在赢的路上";
  return "孙学萌新 / 先把饭吃饱再谈赢";
}

