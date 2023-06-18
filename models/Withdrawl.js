import mongoose from "mongoose";
const WithdrawlSchema = new mongoose.Schema(
  {
    Amount: {
      type: String,
      required:false
    },
    WalletAddress: {
      type: String,
      required: true,  
    },
  },
  { timestamps: true }
);

export default mongoose.model("Withdrawl", WithdrawlSchema);