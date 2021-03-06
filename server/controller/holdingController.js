import { Holdings } from "../models/holdingsModel.js";
import { ObjectId } from "mongodb";

const getAllHoldings = async (req, res) => {
  try {
    setTimeout(async () => {
    const data = await Holdings.find({
      userID: new ObjectId(req.user.id),
    });
      data.length
        ? res.status(200).json({
            status: true,
            message: "Holdings found...",
            data,
          })
        : res.status(200).json({
            status: true,
            message: "No Holdings found...",
          });
    }, 2000);
  } catch (error) {
    res.status(400).json({ status: false, message: "Some error..." });
  }
};

export { getAllHoldings };
