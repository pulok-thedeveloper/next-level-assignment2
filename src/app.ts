import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouter } from "./app/modules/product/product.router";
import { OrderRouter } from "./app/modules/order/order.router";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRouter);
app.use("/api/orders", OrderRouter);

// For Not Found Route Error
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});


app.get("/", (req: Request, res: Response) => {
  res.send("Hello Developers!");
});

export default app;
