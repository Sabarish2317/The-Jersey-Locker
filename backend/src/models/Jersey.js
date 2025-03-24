import mongoose from "mongoose";

const jerseySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["national", "club"], required: true },
    type2: {
      type: String,
      enum: ["fanversion", "playerversion"],
      required: true,
    },
    material: {
      type: String,
      enum: ["embroidery", "sublimation"],
      required: true,
    },
    price: {
      S: { type: Number, required: true },
      M: { type: Number, required: true },
      L: { type: Number, required: true },
      XL: { type: Number, required: true },
    },
    imgUrl: [{ type: String, required: true }], // Array of image URLs
    stock: { type: Number, required: true },
    reviews: [{ user: String, rating: Number, comment: String }], // For future review system
  },
  { timestamps: true }
);

export default mongoose.model("Jersey", jerseySchema);
