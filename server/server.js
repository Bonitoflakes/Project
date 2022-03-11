import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import { router } from "./routes/authRoutes.js";

dotenv.config({ path: "./config/config.env" });


const app = express();
connectDB();


// Middlewares

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.get("/",(req,res)=>res.send("Welcome to HOME"))
app.use("/api/users",router)


// Server init
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})
