import moment from "moment";
import Api, { Trade } from "wikifolio";
import { PortfolioInterface, StockInterface } from "../types";

let wikifolioApi: Api;

export function initWikifolio(email: string, password: string) {
  wikifolioApi = new Api({ email, password });
}

export const getLast24Trades = async (
  porfolios: PortfolioInterface[],
  cb: (trades: StockInterface[]) => void
) => {
  let trades: StockInterface[] = [];

  if (!porfolios.length) return trades;

  const last24h = moment().subtract(24, "hours").format();

  async function asyncLoop() {
    for (let i = 0; i < porfolios.length; i++) {
      const _trades = (
        await wikifolioApi.wikifolio(porfolios[i].ID).trades({ pageSize: 100 })
      ).trades.filter((t) => moment(t.executionDate).format() > last24h);
      // push trades to array
      _trades.forEach((t) => {
        trades.push(mapDataToStockTable(t, porfolios[i]._id));
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
    stockName: trade.name || "",
    ISIN: trade.isin,
    weighted: trade.weightage + "",
    type: trade.type,
    amount: trade.executionPrice + "",
    link: trade.link || "",
    purchaseDate: trade.executionDate,
    portfolioID: portfolioId,
  };
}
