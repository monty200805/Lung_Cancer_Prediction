import React from "react";

export default function PredictionTable({ predictions, onDelete }) {
  if (!predictions || predictions.length === 0) {
    return (
      <div style={{ color: "var(--color-ink-soft)", fontSize: 14, padding: "20px 0" }}>
        No predictions recorded yet.
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Prediction</th>
          <th>Probability</th>
          <th>Model</th>
          {onDelete && <th></th>}
        </tr>
      </thead>
      <tbody>
        {predictions.map((p) => (
          <tr key={p._id || p.id}>
            <td>{new Date(p.createdAt).toLocaleString()}</td>
            <td>
              <span className={`badge ${p.prediction === "High Risk" ? "badge-high" : "badge-low"}`}>
                {p.prediction}
              </span>
            </td>
            <td>{(p.probability * 100).toFixed(1)}%</td>
            <td>{p.modelName}</td>
            {onDelete && (
              <td>
                <button className="btn btn-secondary" onClick={() => onDelete(p._id || p.id)}>
                  Delete
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
