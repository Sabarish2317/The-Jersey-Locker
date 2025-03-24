import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import validator from "validator";

import { sendEmail } from "../utils/emailService.js";
import crypto from "crypto";

// ✅ Forgot Password - Sends OTP via Email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpToken = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    // Save OTP to user record (expires in 10 min)
    user.resetPasswordOTP = otpToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    // Send OTP Email
    await sendEmail(user.email, otp);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
};

// ✅ Reset Password - Verifies OTP & Updates Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashedOTP = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    if (
      hashedOTP !== user.resetPasswordOTP ||
      user.resetPasswordExpire < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    let user = await User.findOne({ email });

    if (user) return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, phone, address });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
