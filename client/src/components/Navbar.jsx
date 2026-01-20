import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="logo" to="/">孙学人生</Link>
      <div className="nav-links">
        <Link to="/theory">理论考察</Link>
        <Link to="/report">我的称号</Link>
        <Link to="/daily">每日孙学</Link>
      </div>
    </nav>
  );
}

