import mongoose from "mongoose";
const { Schema } = mongoose;
import { Holdings } from "./holdingsModel.js";
import { ObjectId } from "mongodb";
import axios from "axios";

const transactionSchema = new mongoose.Schema(
  {
    userID: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    transactionType: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true,
    },
    assetName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    notes: {
      type: String,
    },
    fees: {
      type: Number,
    },
  },
  { collection: "transactions", timestamps: true }
);

const Transaction = mongoose.model("transaction", transactionSchema);

const onInsert = async (fullDocument) => {
  const { userID, assetName, price, quantity, total, transactionType } =
    fullDocument;
  try {
    let searchFields = { userID: new ObjectId(userID), assetName };

    let fetchValues = await Holdings.find(searchFields).exec();
    let fetchValuesCount = fetchValues.length;
    let updatedValues;

    let getPriceFromAPI =
      await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${assetName}&vs_currencies=usd
`);
    if (fetchValuesCount) {
      // destructuring as fetchValues is returned as an array of objects
      let [data] = fetchValues;
      // console.log(data);

      let currentPrice;
      let tq;
      let tc;
      let totalProfit;

      switch (transactionType) {
        case "BUY":
          currentPrice = parseFloat(getPriceFromAPI.data.bitcoin.usd);
          tq = data.total_Quantity + quantity;
          tc = data.total_Cost + total;
          totalProfit = currentPrice * tq - tc;

          updatedValues = {
            total_Quantity: tq,
            total_Cost: tc,
            avg_BuyPrice: tc / tq,
            currentPrice,
            total_Profit: totalProfit,
            ROI: ((totalProfit / tc) * 100).toFixed(2),
            currentValue: currentPrice * tq,
          };
          break;

        case "SELL":
          currentPrice = parseFloat(getPriceFromAPI.data.bitcoin.usd);
          tq = data.total_Quantity - quantity;
          tc = data.total_Cost;
          totalProfit = currentPrice * tq - tc;

          updatedValues = {
            total_Quantity: tq,
            total_Cost: tc,
            avg_BuyPrice: tc / tq,
            currentPrice,
            total_Profit: totalProfit,
            ROI: ((totalProfit / tc) * 100).toFixed(2),
            currentValue: currentPrice * tq,
          };
          break;

        default:
          console.log("----------UNKNOWN TRANSACTION TYPE-------");
          break;
      }
    } else {
      console.log("Data must be created");
      let cost = total;
      let currentPrice = parseFloat(getPriceFromAPI.data.bitcoin.usd);
      let totalProfit = currentPrice * quantity - cost;

      updatedValues = {
        userID: new ObjectId(userID),
        assetName: assetName,
        total_Quantity: quantity,
        total_Cost: cost,
        avg_BuyPrice: price,
        currentPrice,
        total_Profit: totalProfit,
        ROI: ((totalProfit / cost) * 100).toFixed(2),
        currentValue: currentPrice * quantity,
      };
    }

    const data = await Holdings.findOneAndUpdate(
      searchFields,
      { $set: updatedValues },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const TransactionReducer = (data) => {
  const { operationType, fullDocument } = data;
  console.log(`Transaction operationType:${operationType}`);
  switch (operationType) {
    case "insert":
      onInsert(fullDocument);
      break;
    case "update":
      break;
    case "delete":
      break;

    default:
      console.log("Unknown op");
      break;
  }
};

Transaction.watch().on("change", (data) => TransactionReducer(data));

export { Transaction };
