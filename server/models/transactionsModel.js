import { mongoose } from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new mongoose.Schema(
  {
    userID: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "user",
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
  { collection: "transactions" }
);

const Transaction = mongoose.model("transaction", transactionSchema);

export { Transaction };
