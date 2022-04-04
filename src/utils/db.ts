import mongoose from "mongoose";

export default async function (cb: () => void) {
  try {
    await mongoose.connect(process.env.DB_URI || "");
    console.log("Connected To DB");
    cb();
  } catch (error) {
    console.log(error);
    console.log("DB connection failed");
  }
}
