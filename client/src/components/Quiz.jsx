import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api.js";

export default function Quiz({ onFinish }) {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    apiGet("/theory/quiz").then((data) => {
      setQuiz(data.questions);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="card">加载题目中...</div>;

  const ensureUserId = async () => {
    let userId = localStorage.getItem("sunxue_user");
    if (userId) return userId;
    const res = await apiPost("/auth/login", { name: `游客${Date.now().toString().slice(-6)}` });
    localStorage.setItem("sunxue_user", res.user._id);
    return res.user._id;
  };

  const optionText = (qid, key) => {
    const q = quiz.find((item) => item.id === qid);
    const opt = q?.options.find((o) => o.key === key);
    return opt ? `${opt.key}. ${opt.text}` : key || "未作答";
  };

  const submit = async () => {
    try {
      setError("");
      const userId = await ensureUserId();
      const res = await apiPost("/theory/submit", { userId, answers });
      setResult(res);
      onFinish?.(res);
    } catch (e) {
      setError("提交失败，请确认后端已运行。");
    }
  };

  return (
    <div className="grid">
      {quiz.map((q) => (
        <div className="card" key={q.id}>
          <strong>{q.title}</strong>
          <div style={{ marginTop: 8 }}>
            {q.options.map((opt) => (
              <label key={opt.key} style={{ display: "block", marginTop: 6 }}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt.key}
                  checked={answers[q.id] === opt.key}
                  onChange={() => setAnswers({ ...answers, [q.id]: opt.key })}
                />
                <span style={{ marginLeft: 6 }}>{opt.key}. {opt.text}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <button className="btn" onClick={submit}>提交理论考试</button>
      {error && <div>{error}</div>}

      {result?.details && (
        <div className="card">
          <strong>解析与答案</strong>
          <div style={{ marginTop: 8 }}>
            {result.details.map((d) => (
              <div key={d.id} style={{ marginTop: 12, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <div><strong>{d.title}</strong></div>
                <div style={{ marginTop: 6 }}>你的答案：{optionText(d.id, d.chosen)}</div>
                <div>正确答案：{optionText(d.id, d.correct)}</div>
                <div style={{ marginTop: 6, opacity: 0.85 }}>解析：{d.explain}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


