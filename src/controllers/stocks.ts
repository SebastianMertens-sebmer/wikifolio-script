import Stock from "../models/Stock";
import { StockInterface } from "../types";

export const createStocks = async (stocks: StockInterface[]) => {
  return await Stock.insertMany(stocks);
};
