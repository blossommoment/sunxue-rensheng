import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">孙学人生</Link>
      <div className="nav-links">
        <Link to="/theory">理论考察</Link>
        <Link to="/simulator">实践模拟</Link>
        <Link to="/report">我的报告</Link>
        <Link to="/leaderboard">排行榜</Link>
        <Link to="/daily">每日孙学</Link>
        <Link to="/quotes">孙学语录墙</Link>
      </div>
    </nav>
  );
}
