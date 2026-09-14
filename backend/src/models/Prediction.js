const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    inputData: { type: Object, required: true },
    prediction: { type: String, required: true },
    probability: { type: Number, required: true },
    modelName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prediction", predictionSchema);
