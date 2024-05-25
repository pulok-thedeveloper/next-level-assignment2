import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderJoiSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const { error, value } = orderJoiSchema.validate(order);

    const result = await OrderServices.createOrderIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: "Validation error",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "Order has been created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    let result;

    const { email } = req.query;
    if (email) {
      result = await OrderServices.getOrdersByEmailFromDB(email as string);
      // Check if orders exist
      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
    } else {
      result = await OrderServices.getAllOrdersFromDB();
    }

    res.status(200).json({
      success: true,
      message: "Orders has been retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const OrderControllers = {
  getOrders,
  createOrder,
};
