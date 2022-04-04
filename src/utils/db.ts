import mongoose from "mongoose";

export default async function () {
  try {
    await mongoose.connect("mongodb://localhost/wikifolio");
    console.log("Connected To DB");
  } catch (error) {
    console.log(error);
    console.log("DB connection failed");
  }
}
