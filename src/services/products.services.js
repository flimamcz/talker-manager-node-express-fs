const { productsModel } = require('../models');
const { validateId, validateProduct,
  validateSearchProduct } = require('./validations/validationsInputs');

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
  error = await validateSearchProduct(id);
  if (error.type) return error;

  const updated = await productsModel.updateProduct(id, product);
  return { type: null, message: updated };
};

const deleteProduct = async (id) => {
  const search = await productsModel.getProductById(id);
  console.log(search);
  if (search === undefined) return { type: 'NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null, message: true };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
};