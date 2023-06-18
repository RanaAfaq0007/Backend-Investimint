import express from "express";
import { login, register, sendPasswordEmail, updatePassword, verifyEmail, verifyForgotPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register)
router.get("/emailverify/:id/:token",verifyEmail);
router.post("/sendpasswordlink",sendPasswordEmail);
router.get("/password/:id/:token",verifyForgotPassword);

router.post("/resetpassword/:id/:token",updatePassword)

router.post("/login", login)

export default router