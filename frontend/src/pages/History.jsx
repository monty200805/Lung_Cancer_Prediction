import React, { useEffect, useState } from "react";
import predictionService from "../services/predictionService.js";
import PredictionTable from "../components/PredictionTable.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function History() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    predictionService
      .listPredictions()
      .then(setPredictions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id) {
    try {
      await predictionService.deletePrediction(id);
      setPredictions((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <LoadingSpinner label="Loading history..." />;

  return (
    <div>
      <h1>Prediction history</h1>
      <ErrorMessage message={error} />
      <div className="card">
        <PredictionTable predictions={predictions} onDelete={handleDelete} />
      </div>
    </div>
  );
}
