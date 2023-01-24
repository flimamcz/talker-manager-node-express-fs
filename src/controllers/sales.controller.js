const { salesServices } = require('../services');
const errorMap = require('../utils/errorMap');

const getAllSales = async (_req, res) => {
    const { type, message } = await salesServices.getAllSales();
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesServices.getSalesById(id);
  if (type) return res.status(errorMap.mapError(type)).json({ message });
  res.status(200).json(message);
};

module.exports = {
  getAllSales,
  getSalesById,
};