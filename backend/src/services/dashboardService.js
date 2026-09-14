const Prediction = require("../models/Prediction");

async function getStats(userId) {
  const predictions = await Prediction.find({ userId }).sort({ createdAt: -1 });

  const total = predictions.length;
  const highRisk = predictions.filter((p) => p.prediction === "High Risk").length;
  const lowRisk = total - highRisk;
  const recent = predictions.slice(0, 5);

  return {
    total,
    highRisk,
    lowRisk,
    riskDistribution: [
      { name: "High Risk", value: highRisk },
      { name: "Low Risk", value: lowRisk },
    ],
    recent,
  };
}

module.exports = { getStats };
