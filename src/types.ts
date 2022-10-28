import { PostgrestResponse } from "@supabase/supabase-js";

export interface PortfolioInterface {
  id?: any;
  ID: string;
  Name: string;
  Link: string;
  Trader: String;
}

export interface AirtableRecordInterface<T> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface StockInterface {
  id?: any;
  stockName: string;
  ISIN: string | undefined;
  purchaseDate: string | undefined;
  amount: string;
  weighted: string;
  type: any;
  link: string;
  portfolioID: any;
}
