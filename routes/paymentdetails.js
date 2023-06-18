import express from "express";
import { addPaymentDetails, getPaymentDetail } from "../controllers/paymentdetails.js";

const router = express.Router();

router.post("/paymentdetails", addPaymentDetails)
router.get("/currentpaymentdetail/:key", getPaymentDetail);

export default router