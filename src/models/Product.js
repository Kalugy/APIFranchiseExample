import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true, // Name is required
        trim: true, // Remove whitespace from both ends
    },
    stock: {
        type: Number,
        required: true, // Stock is required
        min: 0, // Stock cannot be negative
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Product", productSchema);
