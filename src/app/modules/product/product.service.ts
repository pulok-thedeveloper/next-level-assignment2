import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

// Create Product
const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

//Get All Products
const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

// //Get Product By ID
const getSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result;
};

//Update Product
const updateProductInDB = async (
  productId: string,
  updatedProductData: Partial<Product>
) => {
  const result = await ProductModel.findByIdAndUpdate(
    productId,
    updatedProductData,
    { new: true }
  );

  return result;
};

//Delete Product
const deleteProductFromDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};

// Search Product
const searchProductFromDB = async (searchTerm: string) => {
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { description: { $regex: searchTerm, $options: "i" } },
    ],
  });

  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductInDB,
  deleteProductFromDB,
  searchProductFromDB,
};
