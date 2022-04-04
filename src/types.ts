export interface PortfolioInterface {
  _id?: any;
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
  _id?: any;
  stockName: string;
  ISIN: string | undefined;
  purchaseDate: string | undefined;
  amount: string;
  weighted: string;
  type: any;
  link: string;
  portfolioID: any;
}
