import Portfolio from "../models/Portfolio";

export const getPortfolios = async () => {
  return await Portfolio.find();
};
