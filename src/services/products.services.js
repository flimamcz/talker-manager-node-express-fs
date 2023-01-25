const { productsModel } = require('../models');
const { validateId, validateProduct,
  validateUpdateProduct } = require('./validations/validationsInputs');

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

const createProduct = async (product) => {
  const error = validateProduct(product);
  if (error.type) return error;

  const insertId = await productsModel.createProduct(product);
  const addedProduct = await productsModel.getProductById(insertId);
  return { type: null, message: addedProduct };
};

const updateProduct = async (id, product) => {
  let error = validateId(id);
  if (error.type) return error;
  error = validateProduct(product);
  if (error.type) return error;
  error = await validateUpdateProduct(id);
  if (error.type) return error;

  const updated = await productsModel.updateProduct(id, product);
  return { type: null, message: updated };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};