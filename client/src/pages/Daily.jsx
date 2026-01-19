import { useEffect, useState } from "react";
import { apiGet } from "../api.js";

export default function Daily() {
  const [daily, setDaily] = useState(null);
  useEffect(() => {
    apiGet("/daily").then((data) => setDaily(data));
  }, []);

  if (!daily) return <div className="container"><div className="card">加载今日赢学中...</div></div>;

  return (
    <div className="container">
      <div className="section-title">每日孙学</div>
      <div className="card">
        <div><strong>今日语录：</strong>{daily.quote}</div>
        <div style={{ marginTop: 8 }}><strong>今日挑战：</strong>{daily.challenge}</div>
        <div style={{ marginTop: 8 }}>通关提示：{daily.tip}</div>
      </div>
    </div>
  );
}
