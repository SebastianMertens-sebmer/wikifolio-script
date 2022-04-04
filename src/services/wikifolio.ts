import moment from "moment";
import Api, { Trade, Wikifolio } from "wikifolio";
import {
  AirtableRecordInterface,
  PortfolioInterface,
  StockInterface,
} from "../types";

let wikifolioApi: Api;

export function initWikifolio(email: string, password: string) {
  wikifolioApi = new Api({ email, password });
}

export const getLast24Trades = async (
  porfolios: AirtableRecordInterface<PortfolioInterface>[],
  cb: (trades: StockInterface[]) => void
) => {
  let trades: StockInterface[] = [];

  if (!porfolios.length) return trades;

  const last24h = moment().subtract(24, "hours").format();

  async function asyncLoop() {
    for (let i = 0; i < porfolios.length; i++) {
      const _trades = (
        await wikifolioApi
          .wikifolio(porfolios[i].fields.ID)
          .trades({ pageSize: 100, page: 1 })
      ).trades.filter((t) => moment(t.executionDate).format() > last24h);
      // push trades to array
      _trades.forEach((t) => {
        trades.push(mapDataToStockTable(t, porfolios[i].id));
      });
    }
    return trades;
  }

  asyncLoop()
    .then((data) => {
      cb(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

function mapDataToStockTable(
  trade: Trade,
  portfolioId: string
): StockInterface {
  return {
    Stockname: trade.name,
    ISIN: trade.isin,
    "Weighted 100x": trade.weightage + "",
    Type: trade.type,
    Amount: trade.executionPrice + "",
    Link: trade.link,
    Purchasedate: trade.executionDate,
    PortfolioID: portfolioId,
  };
}
