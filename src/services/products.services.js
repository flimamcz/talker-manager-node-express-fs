const { productsModel } = require('../models');
const { validateId } = require('./validations/validationsInputs');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const error = await validateId(id);
  if (error.type) return error;
  const product = await productsModel.getProductById(id);

  return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};