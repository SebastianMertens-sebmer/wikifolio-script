import mongoose from "mongoose";
import { PortfolioInterface } from "../types";

const schema = new mongoose.Schema<PortfolioInterface>({
  Name: String,
  Link: String,
  ID: String,
  Trader: String,
});

export default mongoose.model("Portfolio", schema);
