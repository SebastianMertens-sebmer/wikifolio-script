import moment from "moment";
import Api, { Trade } from "wikifolio";
import config from "../config/config";
import { PortfolioInterface, StockInterface } from "../types";

let wikifolioApi = new Api({
  email: config.WIKIFOLIO_EMAIL,
  password: config.WIKIFOLIO_PASSWORD,
});

export const getLast24Trades = async (
  porfolios: PortfolioInterface[],
  cb: (trades: StockInterface[]) => void
) => {
  let trades: StockInterface[] = [];

  if (!porfolios.length) return trades;

  // time in minutes by default 1440mins (24h)
  const timeInMins = moment()
    .subtract(config.TIME_IN_MINUTES || 1440, "minutes")
    .format();

  async function asyncLoop() {
    for (let i = 0; i < porfolios.length; i++) {
      const _trades = (
        await wikifolioApi.wikifolio(porfolios[i].ID).trades({ pageSize: 100 })
      ).trades.filter((t) => moment(t.executionDate).format() > timeInMins);
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
