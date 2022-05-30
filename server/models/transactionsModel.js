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
  // take the values of the transaction which was recently inserted
  // find if the assets exists already or not
  // if not create a new holding or else update the existing one
  const { userID, assetName, price, quantity, total, transactionType } = fullDocument;
  try {
    let searchFields = { userID: new ObjectId(userID), assetName };
    let fetchValues = await Holdings.find(searchFields).exec();
    let updatedValues;

    let getPriceFromAPI = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${assetName}&vs_currencies=usd`
    );

    //* when no internet use me
    // let getPriceFromAPI = {
    //   data: {
    //     bitcoin: {
    //       usd: 30000,
    //     },
    //     binancecoin: {
    //       usd: 300,
    //     },
    //     "binance-usd": {
    //       usd: 1,
    //     },
    //     tether: {
    //       usd: 1,
    //     },
    //   },
    // };

    let assetnameLowerCased = assetName.toLowerCase();
    if (fetchValues.length) {
      // destructuring as fetchValues is returned as an array of objects
      let [data] = fetchValues;
      // console.log(data);

      let currentPrice;
      let tq; //total Quantity
      let tc; //total Cost
      let totalProfit;

      switch (transactionType) {
        case "BUY":
          currentPrice = parseFloat(getPriceFromAPI.data[assetnameLowerCased].usd);
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
          currentPrice = parseFloat(getPriceFromAPI.data[assetnameLowerCased].usd);
          tq = data.total_Quantity - quantity;
          tc = data.total_Cost;
          totalProfit = currentPrice * tq - tc;

          updatedValues = {
            total_Quantity: tq,
            total_Cost: tc,
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
      let currentPrice = parseFloat(getPriceFromAPI.data[assetnameLowerCased].usd);
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

    // Find and update the exisiting asset Holding - if it's a new asset create a new holding
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

// update only gives the documentId
// so fetch the transaction with the particular docID
// get the userID and assetName
// make another call to the db to fetch all the documents with the (assetName and userID)
// compute the new Holdings value
// very expensive calculations

const onUpdate = async (documentKey) => {
  const [{ userID, assetName }] = await Transaction.find(documentKey).exec();
  const allTransactions = await Transaction.find({ userID, assetName }).exec();
  // console.log(allTransactions);
  reComputeHoldings(allTransactions, userID, assetName);
};

const reComputeHoldings = async (transactionArray, userID, assetName) => {
  let getPriceFromAPI = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${transactionArray[0].assetName}&vs_currencies=usd`
  );
  console.log(getPriceFromAPI);

  let assetnameLowerCased = transactionArray[0].assetName.toLowerCase();
  let currentPrice = parseFloat(getPriceFromAPI.data[assetnameLowerCased].usd);
  let tq = 0; //total Quantity
  let tc = 0; //total Cost
  let totalProfit = 0;
  let updatedValues;

  transactionArray.map(async (el) => {
    console.log(el.transactionType);
    console.log(el.quantity);
    console.log(el.total);
    console.log(assetnameLowerCased);

    switch (el.transactionType) {
      case "BUY":
        tq += parseFloat(el.quantity);
        tc += parseFloat(el.total);
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
        tq -= parseFloat(el.quantity);
        totalProfit = tc - el.price * tq;

        updatedValues = {
          total_Quantity: tq,
          total_Cost: tc,
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
  });
  // Find and update the exisiting asset Holding - if it's a new asset create a new holding
  const data = await Holdings.findOneAndUpdate(
    { userID, assetName },
    { $set: updatedValues },
    {
      new: true,
      upsert: false,
    }
  );
  console.log(updatedValues);
  console.log("----------------------------------");
  console.log(data);
};

const TransactionReducer = (data) => {
  const { operationType, fullDocument, documentKey } = data;
  console.log(`Transaction operationType:${operationType}`);

  switch (operationType) {
    case "insert":
      // console.log(`Data during Insert:`);
      // console.log(data);
      onInsert(fullDocument);
      break;

    case "update":
      // console.log(`Data during Update:`);
      // console.log(data);
      onUpdate(documentKey);
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
