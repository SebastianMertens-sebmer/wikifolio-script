import { getPortfolios } from "./controllers/portfolios";
import { createStocks } from "./controllers/stocks";
import db from "./utils/db";

import { getLast24Trades } from "./services/wikifolio";

async function init() {
  console.log("Fetching....");

  const portfolios = await getPortfolios();

  await getLast24Trades(portfolios, async (data) => {
    try {
      if (data.length) {
        console.log(`[+] ${data.length} trades found.`);
        await createStocks(data);
        console.log(`[+] ${data.length} trades inserted into Database`);
      } else {
        console.log(`[-] No trades found.`);
      }
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  });
}

(async () => {
  // connect to db;
  db(() => {
    // init app
    init();
  });
})();
