import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { router as AuthRouter } from "./routes/authRoutes.js";
import { router as DashboardRouter } from "./routes/dashboardRoutes.js";
import { router as TransactionRouter } from "./routes/transactionRoutes.js";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

const app = express();

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => res.send("Welcome to HOME"));
app.use("/api/users", AuthRouter);
app.use("/api/user/", DashboardRouter);
app.use("/api/user/", TransactionRouter);

// Server init
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
