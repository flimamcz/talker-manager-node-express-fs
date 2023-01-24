const Joi = require('joi');

const idSchema = Joi.number().integer().required();
const productSchema = Joi.string().required();

module.exports = {
  idSchema,
  productSchema,
};