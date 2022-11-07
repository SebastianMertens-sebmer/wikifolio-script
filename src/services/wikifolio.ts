import moment from "moment";
import Api, { Trade } from "wikifolio";
import config from "../config/config";
import Portfolio from "../models/Portfolio";
import Stock from "../models/Stock";
import { PortfolioInterface, StockInterface } from "../types";
import convertToString from "../utils/convertToString";

let wikifolioApi = new Api({
  email: config.WIKIFOLIO_EMAIL,
  password: config.WIKIFOLIO_PASSWORD,
});

export const getLast24Stocks = async (porfolios: PortfolioInterface[]) => {
  let stocks: StockInterface[] = [];

  if (!porfolios.length) return stocks;

  // time in minutes by default 1440mins (24h)
  const timeInMins = moment()
    .subtract(config.TIME_IN_MINUTES || 1440, "minutes")
    .format();

  async function asyncLoop() {
    for (let i = 0; i < porfolios.length; i++) {
      const _stocks = (
        await wikifolioApi.wikifolio(porfolios[i].ID).trades({ pageSize: 100 })
      ).trades.filter((t) => moment(t.executionDate).format() > timeInMins);
      // push stocks to array
      _stocks.forEach((t) => {
        stocks.push(mapDataToStockTable(t, porfolios[i].id));
      });
    }
    return stocks;
  }

  return await asyncLoop();
};

export const saveAndGetLast24Stocks = async () => {
  const { error, data } = await Portfolio.find();
  if (!error) {
    // @ts-ignore
    const stocks = (await getLast24Stocks(data)).map((s) => ({
      ...s,
      amount: convertToString(s.amount),
      weight: convertToString(s.weight),
    }));

    const stockIds = stocks.map((t) => t.stockId);
    // Delete duplicate stocks
    await Stock.deleteMany("stockId", stockIds);

    await Stock.create(stocks);

    return stocks;
  } else {
    return null;
  }
};

export const saveStocksAfterTimeInterval = () => {
  try {
    // Default 5 minutes
    let miliSec =
      Number.parseFloat(config.SAVE_STOCKS_TIME_INTERVAL_IN_MINUTES || "5") *
      60000;

    setInterval(async () => {
      await saveAndGetLast24Stocks();
    }, miliSec);
  } catch (error) {
    console.log(error);
  }
};

function mapDataToStockTable(
  trade: Trade,
  portfolioId: string
): StockInterface {
  return {
    stockId: trade.id,
    stockName: trade.name || "",
    ISIN: trade.isin,
    weight: trade.weightage + "",
    type: trade.type,
    amount: trade.executionPrice + "",
    link: trade.link || "",
    purchaseDate: trade.executionDate,
    portfolioID: portfolioId,
  };
}
