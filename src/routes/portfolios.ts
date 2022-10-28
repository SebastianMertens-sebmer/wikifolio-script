import express from "express";
import { createPortfolio, getPortfolios } from "../controllers/portfolios";
const router = express.Router();

router.route("/").get(getPortfolios).post(createPortfolio);

export default router;
