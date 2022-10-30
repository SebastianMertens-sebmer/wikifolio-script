import supabase from "../services/supabase";
import { StockInterface } from "../types";

const tableName = "stocks";

class Stock {
  static async create(stocks: StockInterface[]) {
    return await supabase.from(tableName).insert(stocks);
  }

  static find(q = "*") {
    return supabase.from(tableName).select(q).order("id", { ascending: false });
  }

  static deleteMany(column: string, values: any[]) {
    return supabase.from(tableName).delete().in(column, values);
  }
}

export default Stock;
