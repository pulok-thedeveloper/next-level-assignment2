import Joi from "joi";

// Define Joi schema for order
const orderJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string().required(),
  price: Joi.number().required(),
  quantity: Joi.number().integer().required(),
});

export default orderJoiSchema;
