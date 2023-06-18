import mongoose from "mongoose";
const AccountDetailsSchema = new mongoose.Schema(
  {
    clientID: {
      type: String,
      required: true,
      unique: true,
    },
    totalRebates: {
      type: Number,
      default:0,
      required: true,
      
    },
    totalMiningRebate: {
      type: String,
      required: true,
    },
    TotalPopup: {
      type: String,
      required: true,
    },
 
    todaysRebate: {
      type: String,
      required: true,
    },
 
  },
  { timestamps: true }
);

export default mongoose.model("AccountDetails", AccountDetailsSchema);