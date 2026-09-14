import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = { "High Risk": "#a5432f", "Low Risk": "#2f7d54" };

export default function RiskChart({ data }) {
  const hasData = data && data.some((d) => d.value > 0);

  if (!hasData) {
    return (
      <div style={{ color: "var(--color-ink-soft)", fontSize: 14, padding: "30px 0", textAlign: "center" }}>
        No predictions yet - run one from the "New Prediction" page.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={COLORS[entry.name] || "#999"} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
