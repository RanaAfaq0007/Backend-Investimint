import mongoose from "mongoose";
const PaymentsSchema = new mongoose.Schema(
  {
    clientID: {
      type: String,
      required: true,
      unique: true,
    },
    totalAmount: {
      type: Number,
      default:0,
      required: true,
      
    },
    totaldeposited: {
      type: String,
      required: true,
    },
    totalWithdrawl: {
      type: String,
      required: true,
    },
    totalremainingbalance: {
        type: String,
        required: true,
      },
 
   
 
  },
  { timestamps: true }
);

export default mongoose.model("Payments", PaymentsSchema);