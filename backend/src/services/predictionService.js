const Prediction = require("../models/Prediction");
const mlService = require("./mlService");
const ApiError = require("../utils/ApiError");

async function createPrediction(userId, inputData) {
  const mlResult = await mlService.getPrediction(inputData);

  const prediction = await Prediction.create({
    userId,
    inputData,
    prediction: mlResult.prediction,
    probability: mlResult.probability,
    modelName: mlResult.model,
  });

  return prediction;
}

async function listPredictions(userId) {
  return Prediction.find({ userId }).sort({ createdAt: -1 });
}

async function getPredictionById(userId, id) {
  const prediction = await Prediction.findOne({ _id: id, userId });
  if (!prediction) {
    throw new ApiError(404, "Prediction not found");
  }
  return prediction;
}

async function deletePrediction(userId, id) {
  const prediction = await Prediction.findOneAndDelete({ _id: id, userId });
  if (!prediction) {
    throw new ApiError(404, "Prediction not found");
  }
  return prediction;
}

module.exports = {
  createPrediction,
  listPredictions,
  getPredictionById,
  deletePrediction,
};
