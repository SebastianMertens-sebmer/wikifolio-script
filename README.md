##  Wikifolios-API

### Get all stocks
https://wikifolios-api.herokuapp.com/api/stocks

### Get all Sell stocks
https://wikifolios-api.herokuapp.com/api/stocks?type=sell
### Get all Buy stocks
https://wikifolios-api.herokuapp.com/api/stocks?type=buy
### Get Last 24h stocks and save
https://wikifolios-api.herokuapp.com/api/stocks/last-24-hours

### Get all Portfolios
https://wikifolios-api.herokuapp.com/api/portfolios
### Save a Portfolio in DB
https://wikifolios-api.herokuapp.com/api/portfolios **[POST]**

    {
    	Name: string,
    	Link: string,
    	ID: string,
    	Trader: string
    }
