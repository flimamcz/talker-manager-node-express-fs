const { productsModel } = require('../../models');
const { idSchema } = require('./schema');

const validateId = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'Id must be a string' };
  const product = await productsModel.getProductById(id);
  if (product === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
};