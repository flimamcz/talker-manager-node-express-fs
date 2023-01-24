const { productsModel } = require('../../models');
const { idSchema, productSchema } = require('./schema');

const validateId = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'Id must be a string' };
  const product = await productsModel.getProductById(id);
  if (product === undefined) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

const validateProduct = (product) => {
  const { error } = productSchema.validate(product);

  if (error) {
 return {
    type: 'INVALID_VALUE',
    message: '"name" length must be at least 5 characters long',
  }; 
}

  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
};