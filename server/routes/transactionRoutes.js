import { Router } from "express";
import verifyJWT from "./../controller/verifyToken.js";
import {
  addNewTransaction,
  getTransactions,
} from "../controller/transactionController.js";

const router = Router();

router.post("/transaction", verifyJWT, addNewTransaction);
router.get("/transaction", verifyJWT, getTransactions);

export { router };
