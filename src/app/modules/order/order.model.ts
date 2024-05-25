import { Schema, model } from "mongoose";
import { Order } from "./order.interface";
import { ProductModel } from "../product/product.model";

const OrderSchema = new Schema<Order>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Middleware to update inventory before saving an order
OrderSchema.pre("save", async function (next) {
  try {
    // Find the product by productId in the order
    const product = await ProductModel.findById(this.productId);

    // Check if the product exists
    if (!product) {
      throw new Error("Product not found");
    }

    // Check if there is enough quantity in stock
    if (product.inventory.quantity < this.quantity) {
      throw new Error("Insufficient quantity available in inventory");
    }

    // Reduce the quantity in inventory
    product.inventory.quantity -= this.quantity;

    // Update the inStock property
    product.inventory.inStock = product.inventory.quantity > 0;

    // Save the updated product
    await product.save();

    next();
  } catch (error: any) {
    next(error);
  }
});

export const OrderModel = model<Order>("Order", OrderSchema);
