import { useEffect, useState } from "react";
import { apiGet } from "../api.js";
import KnowledgeMap from "../components/KnowledgeMap.jsx";
import Quiz from "../components/Quiz.jsx";
import ContributionForm from "../components/ContributionForm.jsx";

export default function Theory() {
  const [nodes, setNodes] = useState([]);
  const [mastery, setMastery] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    apiGet("/theory/map").then((data) => setNodes(data.nodes));
  }, []);

  return (
    <div className="container">
      <div className="section-title">理论考察区</div>
      <Quiz onFinish={(res) => { setScore(res.score); setMastery(res.mastery); }} />
      {score !== null && (
        <div className="card" style={{ marginTop: 12 }}>
          <strong>理论分数：{score}</strong>
          <div>知识图谱掌握高亮：{mastery.length} 个节点已点亮</div>
        </div>
      )}
      <div style={{ marginTop: 20 }}>
        <div className="section-title">孙学知识图谱</div>
        <KnowledgeMap nodes={nodes} mastery={mastery} />
      </div>
      <div style={{ marginTop: 20 }}>
        <ContributionForm />
      </div>
    </div>
  );
}
