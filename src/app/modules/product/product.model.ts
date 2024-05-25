import { Schema, model } from "mongoose";
import { Inventory, Product, Variant } from "./product.interface";

// Define Variant schema
const variantSchema = new Schema<Variant>({
  type: { type: String, required: true },
  value: { type: String, required: true },
});

// Define Inventory schema
const inventorySchema = new Schema<Inventory>({
  quantity: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
});

// Define Product schema
const productSchema = new Schema<Product>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: { type: [variantSchema], required: true },
  inventory: { type: inventorySchema, required: true },
});

//Create Product Model
export const ProductModel = model<Product>("Product", productSchema);
