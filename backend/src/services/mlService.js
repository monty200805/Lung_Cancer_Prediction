const axios = require("axios");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const mlClient = axios.create({
  baseURL: env.mlServiceUrl,
  timeout: 10000,
});

async function getPrediction(inputData) {
  try {
    const response = await mlClient.post("/predict", inputData);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new ApiError(
        502,
        `ML service error: ${err.response.data?.detail || err.response.statusText}`
      );
    }
    throw new ApiError(503, "ML service is unavailable");
  }
}

async function getModelInfo() {
  try {
    const response = await mlClient.get("/model/info");
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new ApiError(
        502,
        `ML service error: ${err.response.data?.detail || err.response.statusText}`
      );
    }
    throw new ApiError(503, "ML service is unavailable");
  }
}

module.exports = { getPrediction, getModelInfo };
