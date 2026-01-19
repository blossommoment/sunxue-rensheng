import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../api.js";
import Timeline from "../components/Timeline.jsx";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

export default function Home() {
  const [name, setName] = useState("");
  const [logged, setLogged] = useState(!!localStorage.getItem("sunxue_user"));

  const login = async () => {
    if (!name.trim()) return;
    const res = await apiPost("/auth/login", { name });
    localStorage.setItem("sunxue_user", res.user._id);
    setLogged(true);
  };

  return (
    <div className="container">
      {logged && <Confetti numberOfPieces={120} recycle={false} />}
      <div className="hero">
        <div className="hero-card">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }}>
            <div className="slogan">孙学的本质是赢学</div>
            <p style={{ marginTop: 10, opacity: 0.85 }}>
              欢迎来到「孙学人生」：一个大型搞笑互动社区。没有付费、没有VIP，只有赢。
            </p>
          </motion.div>
          <div style={{ marginTop: 16 }} className="grid grid-3">
            <Link className="btn" to="/theory">开始理论考察</Link>
            <Link className="btn" to="/simulator">实践模拟</Link>
            <Link className="btn" to="/report">查看我的孙学报告</Link>
            <Link className="btn" to="/leaderboard">排行榜</Link>
            <Link className="btn" to="/daily">每日孙学</Link>
          </div>
        </div>
        <div className="hero-card">
          <strong>快速登录（不强制）</strong>
          <input className="input" placeholder="取个赢学花名" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn" style={{ marginTop: 10 }} onClick={login}>一键入学</button>
          {logged && <div style={{ marginTop: 8 }}>你已入学，去赢吧。</div>}
        </div>
      </div>
      <div style={{ marginTop: 24 }} className="card">
        <div className="section-title">孙学人生大事时间轴</div>
        <Timeline />
      </div>
    </div>
  );
}
