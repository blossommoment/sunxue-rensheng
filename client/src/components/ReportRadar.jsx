import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

export default function ReportRadar({ data }) {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid stroke="#f5c542" />
          <PolarAngleAxis dataKey="metric" stroke="#fff7e6" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#fff7e6" />
          <Radar dataKey="score" stroke="#ff5c5c" fill="#f5c542" fillOpacity={0.5} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
