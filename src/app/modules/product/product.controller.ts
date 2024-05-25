import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productJoiSchema from "./product.validation";

//create Product
const createProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    // validation using JOI
    const { error, value } = productJoiSchema.validate(product);

    const result = await ProductServices.createProductIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: "Validation Error",
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: "Product has created successfully",
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

//Get All Products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    let result;
    const { searchTerm } = req.query;

    // Check if there is any query searchTerm
    if (searchTerm) {
      result = await ProductServices.searchProductFromDB(searchTerm as string);
    } else {
      result = await ProductServices.getAllProductsFromDB();
    }

    res.status(200).json({
      success: true,
      message: "Products have been retrieved successfully",
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

// Get Single Product by ProductID
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product has retrived successfully",
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

// Update Product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const { updatedProduct } = req.body;

    const result = await ProductServices.updateProductInDB(
      productId,
      updatedProduct
    );

    res.status(200).json({
      success: true,
      message: "Product has been updated successfully",
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

//Delete Product
const deleteProduct = (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = ProductServices.deleteProductFromDB(productId);

    res.status(200).json({
      success: true,
      message: "Product has been deleted successfully",
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
