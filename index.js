import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import accountRoute from "./routes/accountDetails.js";
import paymentdetailsRoute from "./routes/paymentdetails.js";
import WithdrawlRoute from "./routes/withdrawl.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 1200 ;
dotenv.config();
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };

  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });

  

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/account", accountRoute);
app.use("/api/payment", paymentdetailsRoute);
app.use("/api/withdrawl",WithdrawlRoute);



app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });


app.listen(port, () => {
    connect();
    console.log("Connected to backend.");
  });