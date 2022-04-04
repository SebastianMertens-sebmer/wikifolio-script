import mongoose from "mongoose";
import { StockInterface } from "../types";

const schema = new mongoose.Schema<StockInterface>({
  stockName: String,
  ISIN: String,
  purchaseDate: String,
  amount: String,
  weighted: String,
  type: String,
  link: String,
  portfolioID: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Portfolio",
  },
});

export default mongoose.model("Stock", schema);
