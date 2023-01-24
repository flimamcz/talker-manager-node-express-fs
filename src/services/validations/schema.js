const Joi = require('joi');

const idSchema = Joi.number().integer().required();
const productSchema = Joi.string().min(5).required();

module.exports = {
  idSchema,
  productSchema,
};