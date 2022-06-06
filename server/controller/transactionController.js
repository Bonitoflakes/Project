import { Transaction } from "../models/transactionsModel.js";
import { ObjectId } from "mongodb";

const getTransactions = async (req, res) => {
  try {
    const data = await Transaction.find({
      userID: new ObjectId(req.user.id),
    });
    data.length
      ? res.status(200).json({
          status: true,
          message: "Transactions found...",
          data,
        })
      : res.status(200).json({
          status: true,
          message: "No Transactions found...",
        });
  } catch (error) {
    res.status(400).json({ status: false, message: "No data found..." });
  }
};

const addNewTransaction = async (req, res) => {
  try {
    // console.log(req.body.transactionDetails);
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

    const data = await Transaction.create({
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
    res.status(201).json({
      status: true,
      message: "Transaction added successfully..",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error found while creating transaction...",
      error: error.message,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const data = await Transaction.findOneAndUpdate(
      { _id: req.body.id },
      { $set: req.body.transactionDetails },
      {
        new: true,
        upsert: false,
      }
    );
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error found while updating transaction...",
      error: error.message,
    });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const data = await Transaction.deleteOne({ _id: req.query.id });
    // console.log(data);
    data.deletedCount
      ? res.status(200).json({
          status: true,
          message: "Transaction deleted successfully..",
          n: data.deletedCount,
        })
      : res.status(200).json({
          status: false,
          message: "Transaction is either missing or already deleted!!",
        });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: "Error found while deleting transaction...",
      error: error.message,
    });
  }
};

export { addNewTransaction, getTransactions, deleteTransaction, updateTransaction };
