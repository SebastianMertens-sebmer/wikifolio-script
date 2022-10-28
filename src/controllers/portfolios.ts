import { Request, Response } from "express";
import Portfolio from "../models/Portfolio";
import { PortfolioInterface } from "../types";

export const createPortfolio = async (
  req: Request<any, any, PortfolioInterface>,
  res: Response
) => {
  try {
    const { error, data } = await Portfolio.find().eq("ID", req.body.ID);
    if (!error) {
      // if portfolio already exists
      if (data.length) {
        return res
          .status(400)
          .send({ success: false, message: "Portfolio already exists " });
      }
    }

    const { error: _error } = await Portfolio.create(req.body);
    if (!_error) {
      return res
        .status(201)
        .send({ success: true, message: "Portfolio created" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Could not created" });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server side error" });
  }
};

export const getPortfolios = async (req: Request, res: Response) => {
  try {
    const { error, data } = await Portfolio.find();
    if (!error) {
      return res
        .status(200)
        .send({ success: true, data, message: "Portfolios fetched" });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Could not fetched", data: [] });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: "Server side error" });
  }
};
