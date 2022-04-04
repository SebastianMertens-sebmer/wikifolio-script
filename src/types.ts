export interface PortfolioInterface {
  ID: string;
  Name: string;
  Link: string;
  Trader: String;
  Stocks?: any;
}

export interface AirtableRecordInterface<T> {
  id: string;
  createdTime: string;
  fields: T;
}

export interface StockInterface {
  Stockname: string | undefined;
  ISIN: string | undefined;
  Purchasedate: string | undefined;
  Amount: string;
  "Weighted 100x": string;
  Type: any;
  Link: string | undefined;
  PortfolioID: string;
}
