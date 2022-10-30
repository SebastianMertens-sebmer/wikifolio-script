export default {
  PORT: process.env.PORT || 5000,
  WIKIFOLIO_EMAIL: process.env.WIKIFOLIO_EMAIL || "",
  WIKIFOLIO_PASSWORD: process.env.WIKIFOLIO_PASSWORD || "",
  TIME_IN_MINUTES: process.env.TIME_IN_MINUTES || "",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_KEY: process.env.SUPABASE_KEY || "",
  SAVE_STOCKS_TIME_INTERVAL_IN_MINUTES:
    process.env.SAVE_STOCKS_TIME_INTERVAL_IN_MINUTES,
};
