import React from "react";

export default function MetricCard({ label, value, sublabel }) {
  return (
    <div className="card">
      <div style={{ fontSize: 13, color: "var(--color-ink-soft)", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 28, fontFamily: "var(--font-display)", color: "var(--color-primary)" }}>
        {value}
      </div>
      {sublabel && (
        <div style={{ fontSize: 12.5, color: "var(--color-ink-soft)", marginTop: 4 }}>{sublabel}</div>
      )}
    </div>
  );
}
