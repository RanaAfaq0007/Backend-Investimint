import express from "express";
import { addAccountDetails, getAccountDetail } from "../controllers/accountdetails.js";

const router = express.Router();

router.post("/accountdetails", addAccountDetails)
router.get("/currentaccountdetail/:key", getAccountDetail);

export default router