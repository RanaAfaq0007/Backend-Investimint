import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    TelegramUrl: {
      type: String,
      required: true,
    },
 
    password: {
      type: String,
      required: true,
    },
    verified:{
      type: Boolean,
      required: false,
    }
 
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);