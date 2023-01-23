const Joi = require('joi');

const idSchema = Joi.number().integer().required();

module.exports = {
  idSchema,
};