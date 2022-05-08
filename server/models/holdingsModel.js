import  mongoose  from "mongoose";
const { Schema } = mongoose;

const holdingsSchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    assetName: {
      type: String,
      required: true,
    },
    total_Quantity: {
      type: Number,
      required: true,
    },
    total_Cost: {
      type: Number,
      required: true,
    },
    total_Profit: {
      type: Number,
    },
    avg_BuyPrice: {
      type: Number,
      required: true,
    },
  },
  { collection: "holdings", timestamps: true }
);

const Holdings = mongoose.model("holding", holdingsSchema);

export { Holdings };
