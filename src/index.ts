import dotenv from "dotenv";
dotenv.config();

import prompts from "prompts";
import { getPortfolios } from "./controllers/portfolios";
import { createStocks } from "./controllers/stocks";
import db from "./utils/db";

import { getLast24Trades, initWikifolio } from "./services/wikifolio";

// connect to db;
db();

(async () => {
  console.warn("Your credentials will not be stored.");

  const arg = (process.argv || []).slice(2);

  // const { email } = await prompts({
  //   type: "text",
  //   name: "email",
  //   initial: arg[0],
  //   message: "Wikifolio email",
  // });

  // const { password } = await prompts({
  //   type: "password",
  //   name: "password",
  //   initial: arg[1],
  //   message: "Wikifolio password",
  // });

  // // initialize wikifolio instance
  initWikifolio("becomebasti@gmail.com", "utdCsadydmIm");

  console.log("Fetching....");

  const portfolios = await getPortfolios();

  // const portfolios = await getRecordList("Portfolios");

  await getLast24Trades(portfolios, async (data) => {
    try {
      if (data.length) {
        console.log(`[+] ${data.length} trades found in last 24 hours.`);
        await createStocks(data);
        console.log(`[+] ${data.length} trades inserted into Database`);
      } else {
        console.log(`[-] No trades found in last 24 hours.`);
      }
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  });
})();
