import React, { useState } from "react";
import PredictionForm from "../components/PredictionForm.jsx";
import PredictionResult from "../components/PredictionResult.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import predictionService from "../services/predictionService.js";

export default function Predict() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData) {
    setError("");
    setResult(null);
    setSubmitting(true);
    try {
      const prediction = await predictionService.createPrediction(formData);
      setResult(prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <h1>New prediction</h1>
      <div className="disclaimer">
        This system is for educational and research purposes only and is not a medical diagnosis.
      </div>
      <ErrorMessage message={error} />
      <div className="card">
        <PredictionForm onSubmit={handleSubmit} submitting={submitting} />
      </div>
      <PredictionResult result={result} />
    </div>
  );
}
