import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        jerseyId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Jersey",
          required: true,
        },
        size: { type: String, enum: ["S", "M", "L", "XL"], required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    paymentId: { type: String }, // Razorpay/Juspay transaction ID
    address: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
