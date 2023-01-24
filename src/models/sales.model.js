const camelize = require('camelize');
const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(`SELECT * FROM sales AS s JOIN 
  sales_products as sp ON s.id = sp.sale_id`);

  return camelize(result);
}; 

const getSalesById = async (id) => {
  const [resultSales] = await connection.execute(
    'SELECT * FROM sales AS s JOIN sales_products as sp ON s.id = sp.sale_id WHERE s.id = ?',
    [id],
  );

  const sales = camelize(resultSales).map((sale) => ({
    date: sale.date,
    productId: sale.productId,
    quantity: sale.quantity,
  }));

  return sales;
};

module.exports = {
  getAllSales,
  getSalesById,
};