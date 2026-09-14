import React from "react";

export default function PredictionResult({ result }) {
  if (!result) return null;

  const isHigh = result.prediction === "High Risk";

  return (
    <div className="card" style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--color-ink-soft)", marginBottom: 6 }}>Risk category</div>
          <span className={`badge ${isHigh ? "badge-high" : "badge-low"}`}>{result.prediction}</span>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 13, color: "var(--color-ink-soft)", marginBottom: 6 }}>Probability</div>
          <div style={{ fontSize: 22, fontFamily: "var(--font-display)" }}>
            {(result.probability * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      <div style={{ marginTop: 14, fontSize: 13, color: "var(--color-ink-soft)" }}>
        Model used: {result.modelName || result.model}
      </div>
    </div>
  );
}
