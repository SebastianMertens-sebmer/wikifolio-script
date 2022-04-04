import moment from "moment";
import Api, { Trade } from "wikifolio";
import {
  AirtableRecordInterface,
  PortfolioInterface,
  StockInterface,
} from "../types";

const email = "becomebasti@gmail.com";

const password = "utdCsadydmIm";

const wikifolioApi = new Api({ email, password });

export const getLast24Trades = async (
  porfolios: AirtableRecordInterface<PortfolioInterface>[],
  cb: (trades: StockInterface[]) => void
) => {
  let trades: StockInterface[] = [];
  let i = 0;

  if (!porfolios.length) return trades;

  // Async custom loop
  // async function customLoop() {
  //   setTimeout(async function () {
  //     const _trades = (
  //       await wikifolioApi
  //         .wikifolio(porfolios[i].fields.ID)
  //         .trades({ pageSize: 1, page: 1 })
  //     ).trades;

  //     if (_trades.length) {
  //       trades.push(mapDataToStockTable(_trades[i], porfolios[i].id));
  //     }

  //     i++;
  //     if (i < porfolios.length) {
  //       customLoop();
  //     }
  //   }, 500);

  //   return "done";
  // }

  // customLoop().then((d) => {
  //   console.log(d);
  //   console.log(trades);
  // });
  const last24h = moment().subtract(24, "hours").format();

  async function asyncLoop() {
    for (let i = 0; i < porfolios.length; i++) {
      const _trades = (
        await wikifolioApi
          .wikifolio(porfolios[i].fields.ID)
          .trades({ pageSize: 1, page: 1 })
      ).trades.filter((t) => moment(t.executionDate).format() > last24h);

      trades.push(mapDataToStockTable(_trades[i], porfolios[i].id));
    }
    return trades;
  }

  asyncLoop().then((data) => {
    cb(data);
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

export default wikifolioApi;
