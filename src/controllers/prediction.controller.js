const predictionService = require("../services/prediction.service");

// Comprobar que el servicio está levantado
function health(req, res) {
  res.json({
    status: "ok",
    service: "prediction-service"
  });
}

// Comprobar que el modelo está listo
function ready(req, res) {
  if (predictionService.isReady()) {
    return res.json({ ready: true, modelVersion: "v1.0" });
  }
  res.status(503).json({
    ready: false,
    modelVersion: "v1.0",
    message: "Model is not ready"
  });
}

// Consultar características
function getFeatures(req, res) {
  res.json({
    features: predictionService.getFeatures()
  });
}

// Procesar petición de predicción
async function predict(req, res) {
  try {
    const { features } = req.body || {};

    const prediccion =
      await predictionService.predict(features);

    res.json({
      prediction: prediccion
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({
      error: error.status === 400
        ? error.message
        : "Error al ejecutar la predicción"
    });
  }
}

module.exports = {
  health,
  ready,
  getFeatures,
  predict
};