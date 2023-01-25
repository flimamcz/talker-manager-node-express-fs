const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(
    `
  SELECT * FROM StoreManager.products WHERE id = ?`,
    [id],
  );
  return result[0];
};

const createProduct = async (product) => {
  const [{ insertId }] = await connection.execute(`
    INSERT INTO StoreManager.products SET name = ? 
  `, [product]);
  
  return insertId;
};

const updateProduct = async (id, product) => {
  await connection.execute(`
    UPDATE StoreManager.products SET name = ?  WHERE id = ?
  `, [product, id]);
  
  return { name: product, id };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};
