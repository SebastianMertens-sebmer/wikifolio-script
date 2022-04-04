import dotenv from "dotenv";
dotenv.config();

import prompts from "prompts";
import { createRecords, getRecordList } from "./services/airtable";
import { getLast24Trades, initWikifolio } from "./services/wikifolio";

(async () => {
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

  // initialize wikifolio instance
  initWikifolio(email, password);

  const portfolios = await getRecordList("Portfolios");

  await getLast24Trades([portfolios[0]], async (data) => {
    const tradeRecords = data.map((d) => ({
      fields: { ...d, PortfolioID: [d.PortfolioID] },
    }));
    try {
      if (data.length) {
        console.log(`[+] ${data.length} trades found in last 24 hours.`);
        await createRecords("Stocks", tradeRecords);
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
