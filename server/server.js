import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { router } from "./routes/authRoutes.js";

dotenv.config({ path: "./config/config.env" });


const app = express();
connectDB();


// Middlewares
app.use(express.json());
app.get("/",(req,res)=>res.send("OK"))
app.use(router)


// Server init
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
