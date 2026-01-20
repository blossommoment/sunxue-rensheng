import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../api.js";
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
              只保留三件事：理论考试、称号、每日孙学语录。简单直接，稳赢。
            </p>
          </motion.div>
          <div style={{ marginTop: 16 }} className="grid grid-3">
            <Link className="btn" to="/theory">开始理论考试</Link>
            <Link className="btn" to="/report">查看我的称号</Link>
            <Link className="btn" to="/daily">今日孙学语录</Link>
          </div>
        </div>
        <div className="hero-card">
          <strong>快速登录（不强制）</strong>
          <input className="input" placeholder="取个赢学花名" value={name} onChange={(e) => setName(e.target.value)} />
          <button className="btn" style={{ marginTop: 10 }} onClick={login}>一键入学</button>
          {logged && <div style={{ marginTop: 8 }}>你已入学，去赢吧。</div>}
        </div>
      </div>
    </div>
  );
}

