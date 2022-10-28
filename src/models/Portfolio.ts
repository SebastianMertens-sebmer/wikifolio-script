import supabase from "../services/supabase";
import { PortfolioInterface } from "../types";
const tableName = "portfolios";

class Portfolio {
  static create(data: PortfolioInterface) {
    return supabase.from(tableName).insert(data);
  }

  static find(q = "*") {
    return supabase.from(tableName).select(q);
  }
}

export default Portfolio;
