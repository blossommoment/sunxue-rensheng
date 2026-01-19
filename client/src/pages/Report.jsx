import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api.js";
import ReportRadar from "../components/ReportRadar.jsx";

export default function Report() {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");

  const ensureUserId = async () => {
    let userId = localStorage.getItem("sunxue_user");
    if (userId) return userId;
    const res = await apiPost("/auth/login", { name: `游客${Date.now().toString().slice(-6)}` });
    localStorage.setItem("sunxue_user", res.user._id);
    return res.user._id;
  };

  const fetchReport = async () => {
    try {
      setError("");
      const userId = await ensureUserId();
      const data = await apiGet(`/report/${userId}`);
      setReport(data);
    } catch (e) {
      setError("获取报告失败，请确认后端已运行。");
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("sunxue_user");
    if (!userId) return;
    fetchReport();
  }, []);

  if (!report) {
    return (
      <div className="container">
        <div className="card">
          <div>先去理论考察或实践模拟拿到分数吧。</div>
          <button className="btn" style={{ marginTop: 8 }} onClick={fetchReport}>生成游客档案并刷新报告</button>
          {error && <div style={{ marginTop: 8 }}>{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-title">我的孙学报告</div>
      <div className="grid grid-3">
        <div className="card">
          <div>理论分：{report.theoryScore}</div>
          <div>实践分：{report.practiceScore}</div>
          <div>总分：{report.totalScore}</div>
          <div style={{ marginTop: 8 }}>称号：{report.title}</div>
          <button className="btn" style={{ marginTop: 10 }} onClick={fetchReport}>刷新称号</button>
        </div>
        <div className="card" style={{ gridColumn: "span 2" }}>
          <ReportRadar data={report.radar} />
        </div>
      </div>
    </div>
  );
}

