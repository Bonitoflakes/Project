import { Router } from "express";
import {
  addNewTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controller/transactionController.js";

const router = Router();

router.post("/transaction", addNewTransaction);
router.get("/transaction", getTransactions);
router.put("/transaction", updateTransaction);
router.delete("/transaction", deleteTransaction);

export { router };
