const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");

const env = require("./config/env");
const swaggerSpec = require("./config/swagger");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const authRoutes = require("./routes/authRoutes");
const predictionRoutes = require("./routes/predictionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const modelRoutes = require("./routes/modelRoutes");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
if (env.nodeEnv !== "test") {
  app.use(morgan("dev"));
}

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (req, res) => {
  res.json({ success: true, data: { status: "ok" } });
});

app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/model", modelRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
