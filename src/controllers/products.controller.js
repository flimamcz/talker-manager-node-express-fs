const { productsServices } = require('../services');
const errorMap = require('../utils/errorMap');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsServices.getAllProducts();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.getProductById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsServices.createProduct(name);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(201).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
};