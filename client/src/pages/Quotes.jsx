import { useEffect, useState } from "react";
import { apiGet } from "../api.js";

export default function Quotes() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    apiGet("/quotes").then((data) => setItems(data.items));
  }, []);

  return (
    <div className="container">
      <div className="section-title">孙学语录墙</div>
      <div className="grid grid-3">
        {items.map((q) => (
          <div className="card" key={q.id}>
            <strong>{q.text}</strong>
            <div style={{ marginTop: 6, opacity: 0.7 }}>{q.source}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
