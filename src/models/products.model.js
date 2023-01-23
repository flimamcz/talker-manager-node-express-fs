const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id`,
    [id]);
  return result[0];
};

module.exports = {
  getAllProducts,
  getProductById,
};