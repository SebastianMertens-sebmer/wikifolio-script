import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express, { Response } from "express";
import config from "./config/config";
const app = express();

import auth from "./middlewares/auth";
// Routes
import portfoliosRoutes from "./routes/portfolios";
import stocksRoutes from "./routes/stocks";
import { saveStocksAfterTimeInterval } from "./services/wikifolio";

// App config
app.use(express.json());

// Auth middleware
app.use(auth);
// Mount routes
app.use("/api/portfolios", portfoliosRoutes);
app.use("/api/stocks", stocksRoutes);

app.use("*", (_, res: Response) => {
  res.status(404).send({ success: false, message: "404 not found ):" });
});

// Save stocks after some interval
saveStocksAfterTimeInterval();

app.listen(config.PORT, () => {
  console.log(`Listing on port ${config.PORT}`);
});
