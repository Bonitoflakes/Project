import { Transaction } from "../models/transactionsModel.js";
import { ObjectId } from "mongodb";

const getTransactions = async (req, res) => {
  try {
    const transactionDetails = await Transaction.find({
      userID: new ObjectId(req.user.id),
    });
    res
      .status(200)
      .json({ status: true, message: "Data found...", transactionDetails });
  } catch (error) {
    res.status(400).json({ status: false, message: "No data found..." });
  }
};

const addNewTransaction = async (req, res) => {
  try {
    console.log(req.body.transactionDetails);
    const {
      transactionType,
      assetName,
      quantity,
      price,
      date,
      time,
      total,
      notes,
      fees,
    } = req.body.transactionDetails;
    const transactionDetails = await Transaction.create({
      userID: req.user.id,
      transactionType,
      assetName,
      quantity,
      price,
      date,
      time,
      total,
      notes,
      fees,
    });
    res.status(200).json({
      status: true,
      message: "Transaction added successfully..",
      transactionDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: "Error found..." });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    console.log(`Delete Transaction`);
  } catch (error) {}
};

const updateTransaction = async (req, res) => {
  try {
    console.log(`Update Transaction`);
  } catch (error) {}
};

export {
  addNewTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
