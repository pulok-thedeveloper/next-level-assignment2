import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

//Create Order
const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

//Get Order
const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

// Finf Orders By Email
const getOrdersByEmailFromDB = async (email: string) => {
  const result = await OrderModel.find({ email: { $eq: email } });
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getOrdersByEmailFromDB,
};
