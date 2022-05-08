import mongoose from "mongoose";
const { Schema } = mongoose;
import { Holdings } from "./holdingsModel.js";
import { ObjectId } from "mongodb";

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
  console.log(`Full document : `);
  console.log(fullDocument);
  const { userID, assetName, price, quantity, total } = fullDocument;
  let shldWeCreate = null;
  try {
    const currentCoinHolding = await Holdings.find(
      {
        userID: new ObjectId(userID),
        assetName: assetName,
      },
      function (err, result) {
        if (err) {
          console.error(err);
        } else if (result.length > 0) {
          console.log(`Logging results:`);
          console.log(result);
        } else {
          console.log("no match found");
          shldWeCreate = true;
        }
      }
    );
    if (shldWeCreate) {
      await Holdings.create({
        userID: new ObjectId(userID),
        assetName: assetName,
        total_Quantity: quantity,
        total_Cost: total,
        total_Profit: 0,
        avg_BuyPrice: total_Cost / total_Quantity,
      });
      shldWeCreate = false;
    }
  } catch (error) {
    console.error(error);
  }
};

const TransactionReducer = (data) => {
  const { operationType, fullDocument } = data;
  switch (operationType) {
    case "insert":
      console.log("insert op");
      onInsert(fullDocument);
      break;
    case "update":
      console.log("update op");
      break;
    case "delete":
      console.log("delete op");
      break;

    default:
      console.log("Unknown op");
      break;
  }
};

Transaction.watch().on("change", (data) => TransactionReducer(data));

export { Transaction };
