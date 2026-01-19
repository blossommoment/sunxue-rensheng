import { useEffect, useState } from "react";
import { apiGet } from "../api.js";

export default function Leaderboard() {
  const [list, setList] = useState([]);

  useEffect(() => {
    apiGet("/leaderboard").then((data) => setList(data.items));
  }, []);

  return (
    <div className="grid">
      {list.map((u, idx) => (
        <div key={u._id} className="card">
          <strong>#{idx + 1} {u.name}</strong>
          <div>总分：{u.totalScore}</div>
        </div>
      ))}
    </div>
  );
}
