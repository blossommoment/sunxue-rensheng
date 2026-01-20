import { useState } from "react";
import Quiz from "../components/Quiz.jsx";

export default function Theory() {
  const [score, setScore] = useState(null);

  return (
    <div className="container">
      <div className="section-title">理论考试</div>
      <Quiz onFinish={(res) => { setScore(res.score); }} />
      {score !== null && (
        <div className="card" style={{ marginTop: 12 }}>
          <strong>理论分数：{score}</strong>
        </div>
      )}
    </div>
  );
}

