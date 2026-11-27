const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Esquema de cada predicción guardada en MongoDB
const PredictionSchema = new Schema({
  features: { type: [Number], required: true },
  prediction: { type: Number, required: true },
  dataId: String,
  source: String,
  correlationId: String,
  latencyMs: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prediction", PredictionSchema);
