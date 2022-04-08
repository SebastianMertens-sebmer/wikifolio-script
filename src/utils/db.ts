import mongoose from "mongoose";
import config from "../config/config.json";

export default async function (cb: () => void) {
  try {
    await mongoose.connect(config.DB_URI);
    console.log("Connected To DB");
    cb();
  } catch (error) {
    console.log(error);
    console.log("DB connection failed");
    process.exit();
  }
}
