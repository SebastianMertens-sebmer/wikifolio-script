import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

import express from "express";
import config from "./config/config";
const app = express();

app.use(express.json());

// Routes
import portfoliosRoutes from "./routes/portfolios";
import stocksRoutes from "./routes/stocks";

// Mount routes
app.use("/api/portfolios", portfoliosRoutes);
app.use("/api/stocks", stocksRoutes);

app.listen(config.PORT, () => {
  console.log(`Listing on port ${config.PORT}`);
});
