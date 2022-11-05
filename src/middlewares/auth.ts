import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessKey = req.query.apiAccessKey;

  if (!accessKey) {
    return res
      .status(401)
      .send({ success: false, message: "No API Access key found" });
  }

  try {
    await jwt.verify(accessKey.toString(), config.API_ACCESS_KEY_SECRET);
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid API Access key" });
  }
}
