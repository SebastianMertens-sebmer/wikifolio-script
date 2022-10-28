import express from "express";
import { getStocks, getLast24hourStocks } from "../controllers/stocks";
const router = express.Router();

router.get("/", getStocks);
router.get("/last-24-hours", getLast24hourStocks);

export default router;
