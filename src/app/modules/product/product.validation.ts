import Joi from "joi";

// Define Joi schema for variant
const variantJoiSchema = Joi.object({
  type: Joi.string().required(),
  value: Joi.string().required(),
});

// Define Joi schema for inventory
const inventoryJoiSchema = Joi.object({
  quantity: Joi.number().integer().required(),
  inStock: Joi.boolean().required(),
});

// Define Joi schema for product
const productJoiSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(),
  variants: Joi.array().items(variantJoiSchema).required(),
  inventory: inventoryJoiSchema.required(),
});

export default productJoiSchema;
