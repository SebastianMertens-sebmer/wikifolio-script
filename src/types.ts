import { PostgrestResponse } from "@supabase/supabase-js";

export interface PortfolioInterface {
  id?: any;
  ID: string;
  Name: string;
  Link: string;
  Trader: String;
}

export interface StockInterface {
  id?: any;
  stockId: any;
  stockName: string;
  ISIN: string | undefined;
  purchaseDate: string | undefined;
  amount: string;
  weight: string;
  type: "buy" | "sell" | "other" | undefined;
  link: string;
  portfolioID: any;
}
