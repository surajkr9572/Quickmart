import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    selectedSize: { type: String, required: true },
    selectedColor: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    shipping: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const cart = mongoose.model("cart", ProductSchema);

export { cart };
