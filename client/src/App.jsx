import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Theory from "./pages/Theory.jsx";
import SimulatorPage from "./pages/SimulatorPage.jsx";
import Report from "./pages/Report.jsx";
import Quotes from "./pages/Quotes.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import Daily from "./pages/Daily.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/theory" element={<Theory />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/daily" element={<Daily />} />
      </Routes>
    </div>
  );
}
