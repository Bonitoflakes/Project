import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { router as AuthRouter } from "./routes/authRoutes.js";
import { router as TransactionRouter } from "./routes/transactionRoutes.js";
import verifyJWT from "./controller/verifyToken.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => res.send("Welcome to HOME"));
app.use("/api/users", AuthRouter);
app.use("/api/user/", verifyJWT, TransactionRouter);

// Server init
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
