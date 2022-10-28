import { PostgrestResponse } from "@supabase/supabase-js";
import mongoose from "mongoose";
import supabase from "../services/supabase";
import { StockInterface } from "../types";

const tableName = "stocks";

class Stock {
  static async create(stocks: StockInterface[]) {
    return await supabase.from(tableName).insert(stocks);
  }

  static find(q = "*") {
    return supabase.from(tableName).select(q);
  }
}

export default Stock;
