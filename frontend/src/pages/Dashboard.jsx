import React, { useEffect, useState } from "react";
import predictionService from "../services/predictionService.js";
import modelService from "../services/modelService.js";
import MetricCard from "../components/MetricCard.jsx";
import RiskChart from "../components/RiskChart.jsx";
import PredictionTable from "../components/PredictionTable.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([predictionService.getDashboardStats(), modelService.getModelInfo().catch(() => null)])
      .then(([statsData, model]) => {
        setStats(statsData);
        setModelInfo(model);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard..." />;

  return (
    <div>
      <h1>Dashboard</h1>
      <ErrorMessage message={error} />

      <div className="grid-3" style={{ marginBottom: 22 }}>
        <MetricCard label="Total predictions" value={stats?.total ?? 0} />
        <MetricCard label="High risk" value={stats?.highRisk ?? 0} />
        <MetricCard label="Low risk" value={stats?.lowRisk ?? 0} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, marginBottom: 22 }}>
        <div className="card">
          <h3>Risk distribution</h3>
          <RiskChart data={stats?.riskDistribution} />
        </div>
        <div className="card">
          <h3>Model information</h3>
          {modelInfo ? (
            <div style={{ fontSize: 14, lineHeight: 1.9 }}>
              <div>Model: {modelInfo.model_name}</div>
              <div>Base estimator: {modelInfo.base_estimator}</div>
              <div>
                Selected features: {modelInfo.n_features_selected} / {modelInfo.n_features_total}
              </div>
              {modelInfo.test_metrics && (
                <div style={{ marginTop: 8 }}>
                  Accuracy: {(modelInfo.test_metrics.accuracy * 100).toFixed(1)}% &middot; F1:{" "}
                  {(modelInfo.test_metrics.f1_score * 100).toFixed(1)}% &middot; ROC-AUC:{" "}
                  {modelInfo.test_metrics.roc_auc ? (modelInfo.test_metrics.roc_auc * 100).toFixed(1) + "%" : "n/a"}
                </div>
              )}
            </div>
          ) : (
            <p style={{ color: "var(--color-ink-soft)", fontSize: 14 }}>
              Model info unavailable - make sure the ML service is running and trained.
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h3>Recent predictions</h3>
        <PredictionTable predictions={stats?.recent} />
      </div>
    </div>
  );
}
