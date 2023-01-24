const { salesModel } = require('../models');
const { validateIdSales } = require('./validations/validationsInputs');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const error = await validateIdSales(id);
  if (error.type) return error;
  const sale = await salesModel.getSalesById(id);
  return { type: null, message: sale };
};

module.exports = {
  getAllSales,
  getSalesById,
};