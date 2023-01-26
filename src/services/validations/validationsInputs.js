const { productsModel, salesModel } = require('../../models');
const { idSchema, productSchema } = require('./schema');

const validateId = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'Id must be a number' };
  const product = await productsModel.getProductById(id);
  if (product === undefined) return { type: 'NOT_FOUND', message: 'Product not found' };
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

const validateIdSales = async (saleId) => {
  const { error } = idSchema.validate(saleId);
  if (error) return { type: 'INVALID_VALUE', message: 'Id must be a number' };
  const sale = await salesModel.getSalesById(saleId);
  if (sale.length <= 0) return { type: 'NOT_FOUND', message: 'Sale not found' };
  return { type: null, message: '' };
};

const validateSearchProduct = async (id) => {
  const { error } = idSchema.validate(id);
  if (error) return { type: 'INVALID_VALUE', message: 'Id must be a number' };
  const searchProduct = await productsModel.getProductById(id);
  if (searchProduct === undefined) return { type: 'NOT_FOUND', message: 'Product not found' };
  return { type: null, message: '' };
};

module.exports = {
  validateId,
  validateProduct,
  validateIdSales,
  validateSearchProduct,
};