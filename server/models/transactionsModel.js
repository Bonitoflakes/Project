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
  // console.log(`Full document : `);
  // console.log(fullDocument);

  const { userID, assetName, price, quantity, total, transactionType } =
    fullDocument;
  try {
    /* 
    findOneAndUpdate takes in the fields to find , values to update , optional parameters new : true - whether to return the document after updation , UPSERT - update if document exists or else insert a documnet into the collection
    */

    let searchFields = { userID: new ObjectId(userID), assetName };
    // console.log(`searchFields : ${searchFields}`);
    // console.log(searchFields);

    let fetchValues = await Holdings.find(searchFields).exec();
    let fetchValuesCount = await Holdings.find(searchFields).count().exec();
    // console.log(`fetchValues: ${fetchValuesCount}`);

    let updatedValues;

    if (fetchValuesCount) {
      // console.log("Data already exists");
      // destructuring as fetchValues is returned as an array of objects
      let [data] = fetchValues;
      // console.log(data);
      console.log(transactionType);
      switch (transactionType) {
        case "BUY":
          updatedValues = {
            total_Quantity: data.total_Quantity + quantity,
            total_Cost: data.total_Cost + total,
            avg_BuyPrice:
              (data.total_Cost + total) / (data.total_Quantity + quantity),
          };
          break;

        case "SELL":
          updatedValues = {
            total_Quantity: data.total_Quantity - quantity,
          };
          break;

        default:
          console.log("----------UNKNOWN TRANSACTION TYPE-------");
          break;
      }
    } else {
      // console.log("Data must be created");
      updatedValues = {
        userID: new ObjectId(userID),
        assetName: assetName,
        total_Quantity: quantity,
        total_Cost: total,
        avg_BuyPrice: price,
      };
    }
    // console.log(`UpdatedValues to be sent `);
    // console.log(updatedValues);
    const myRes = await Holdings.findOneAndUpdate(
      searchFields,
      { $set: updatedValues },
      {
        new: true,
        upsert: true,
      }
    );
    // console.log("Value after updation:");
    // console.log(myRes);
    //
  } catch (error) {
    console.error(error);
  }
};

const TransactionReducer = (data) => {
  const { operationType, fullDocument } = data;
  console.log(`operationType:${operationType}`);
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
