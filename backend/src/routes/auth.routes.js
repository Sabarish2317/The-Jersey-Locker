import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controller/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword); // Sends OTP via Email
router.post("/reset-password", resetPassword); // Resets Password with OTP

export default router;
