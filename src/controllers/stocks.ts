import { Request, Response } from "express";
import Portfolio from "../models/Portfolio";
import Stock from "../models/Stock";
import { getLast24Trades } from "../services/wikifolio";
import { PortfolioInterface, StockInterface } from "../types";

export const getStocks = async (req: Request, res: Response) => {
  try {
    const { error, data } = await Stock.find();
    if (!error) {
      return res
        .status(200)
        .send({ success: true, data, message: "Stocks fetched" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Could not fetched", data: [] });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server side error" });
  }
};

export const getLast24hourStocks = async (req: Request, res: Response) => {
  try {
    const { error, data } = await Portfolio.find();
    if (!error) {
      // @ts-ignore
      await getLast24Trades(data, (trades) => {
        // Todo save trades in DB

        return res.status(200).send({
          success: true,
          data: trades,
          message: "Last 24h stocks fetched.",
        });
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Portfolios could not fetched",
        data: [],
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server side error" });
  }
};

export const createStocks = async (req: Request, res: Response) => {
  // Todo
};
