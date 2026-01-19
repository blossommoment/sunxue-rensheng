import { useState } from "react";
import { apiPost } from "../api.js";

export default function Simulator() {
  const [form, setForm] = useState({ age: "", job: "", goal: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const ensureUserId = async () => {
    let userId = localStorage.getItem("sunxue_user");
    if (userId) return userId;
    const res = await apiPost("/auth/login", { name: `游客${Date.now().toString().slice(-6)}` });
    localStorage.setItem("sunxue_user", res.user._id);
    return res.user._id;
  };

  const run = async () => {
    try {
      setError("");
      const userId = await ensureUserId();
      const res = await apiPost("/simulator/run", { userId, ...form });
      setResult(res);
    } catch (e) {
      setError("模拟器启动失败，请确认后端已运行。" );
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <div>年龄</div>
        <input className="input" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} />
        <div style={{ marginTop: 10 }}>职业</div>
        <input className="input" value={form.job} onChange={(e) => setForm({ ...form, job: e.target.value })} />
        <div style={{ marginTop: 10 }}>当前目标</div>
        <input className="input" value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
        <button className="btn" style={{ marginTop: 12 }} onClick={run}>启动孙学模拟</button>
        {error && <div style={{ marginTop: 8 }}>{error}</div>}
      </div>
      {result && (
        <div className="card">
          <div><strong>随机事件：</strong>{result.event}</div>
          <div style={{ marginTop: 6 }}><strong>决策路径：</strong></div>
          <ul style={{ marginTop: 6, paddingLeft: 18 }}>
            {result.paths.map((p) => (
              <li key={p.title}>{p.title}：{p.outcome}</li>
            ))}
          </ul>
          <div style={{ marginTop: 8 }}><strong>本次得分：</strong>{result.score}</div>
          <div style={{ marginTop: 6 }}>彩蛋结局：{result.ending}</div>
        </div>
      )}
    </div>
  );
}

