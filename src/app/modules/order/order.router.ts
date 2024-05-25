import express from "express";
import { OrderControllers } from "./order.controller";

const router = express.Router();
//Order Routes
router.get("/", OrderControllers.getOrders);
router.post("/", OrderControllers.createOrder);

export const OrderRouter = router;
