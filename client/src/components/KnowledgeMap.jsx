import { useState } from "react";

export default function KnowledgeMap({ nodes, mastery }) {
  const [open, setOpen] = useState({});

  return (
    <div className="grid grid-3">
      {nodes.map((n) => (
        <div key={n.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong style={{ color: mastery.includes(n.id) ? "#f5c542" : "#fff" }}>{n.title}</strong>
            <button className="btn" onClick={() => setOpen({ ...open, [n.id]: !open[n.id] })}>展开</button>
          </div>
          {open[n.id] && (
            <div style={{ marginTop: 10 }}>
              <div>{n.desc}</div>
              <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>原话：{n.quote}</div>
              <div style={{ marginTop: 8 }}>彩蛋：{n.meme}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
