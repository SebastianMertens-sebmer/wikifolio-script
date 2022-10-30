import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import config from "./config/config";
const app = express();

// Routes
import portfoliosRoutes from "./routes/portfolios";
import stocksRoutes from "./routes/stocks";

import { saveStocksAfterTimeInterval } from "./services/wikifolio";

// App config
app.use(express.json());

// Mount routes
app.use("/api/portfolios", portfoliosRoutes);
app.use("/api/stocks", stocksRoutes);

// Save stocks after some interval
// saveStocksAfterTimeInterval();

app.listen(config.PORT, () => {
  console.log(`Listing on port ${config.PORT}`);
});
