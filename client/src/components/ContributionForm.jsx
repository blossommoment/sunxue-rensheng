import { useState } from "react";
import { apiPost } from "../api.js";

export default function ContributionForm() {
  const [text, setText] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const userId = localStorage.getItem("sunxue_user");
    await apiPost("/contrib", { userId, text });
    setMsg("投稿成功，等待审核上线！");
    setText("");
  };

  return (
    <div className="card">
      <strong>投稿你的孙学解读</strong>
      <textarea className="input" rows="4" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="btn" style={{ marginTop: 8 }} onClick={submit}>提交投稿</button>
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </div>
  );
}
