import express from "express";
import { addWithdrawlRequest, getWithdrawlDetails } from "../controllers/withdrawl.js";

const router = express.Router();

router.post("/sendWithdrawlRequest", addWithdrawlRequest)
router.get("/withdrawlrequest/:key", getWithdrawlDetails);

export default router