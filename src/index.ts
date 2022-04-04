import dotenv from "dotenv";
dotenv.config();

import prompts from "prompts";
import { getPortfolios } from "./controllers/portfolios";
import { createStocks } from "./controllers/stocks";
import db from "./utils/db";

import { getLast24Trades, initWikifolio } from "./services/wikifolio";

async function init() {
  console.warn("Your credentials will not be stored.");

  const arg = (process.argv || []).slice(2);

  const { email } = await prompts({
    type: "text",
    name: "email",
    initial: arg[0],
    message: "Wikifolio email",
  });

  const { password } = await prompts({
    type: "password",
    name: "password",
    initial: arg[1],
    message: "Wikifolio password",
  });

  if (!email || !password) {
    console.log("Email and password are required");
    return process.exit();
  }

  // // initialize wikifolio instance
  initWikifolio(email, password);

  console.log("Fetching....");

  const portfolios = await getPortfolios();

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
}

(async () => {
  // connect to db;
  db(() => {
    // init app
    init();
  });
})();
