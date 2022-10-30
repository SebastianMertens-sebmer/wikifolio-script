import { Request, Response } from "express";
import Stock from "../models/Stock";
import { saveAndGetLast24Stocks } from "../services/wikifolio";

export const getStocks = async (req: Request, res: Response) => {
  const { type } = req.query;

  let query = Stock.find();
  if (type) {
    query.eq("type", type);
  }

  // let query = Stock.find();

  try {
    // Execute query
    const { error, data } = await query;
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
    const stocks = await saveAndGetLast24Stocks();
    if (stocks) {
      return res.status(200).send({
        success: true,
        data: stocks,
        message: "Last 24h stocks fetched.",
      });
    }

    return res.status(400).send({
      success: false,
      message: "Portfolios could not fetched",
      data: [],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Server side error" });
  }
};
