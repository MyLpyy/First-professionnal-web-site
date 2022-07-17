const db = require('./db');
const helper = require('../helper');

async function getEveryProduct() {

  const rows = await db.query(
    `SELECT * FROM product`
  );

  const data = helper.emptyOrRows(rows);

  return data;
}

async function randomProducts() {

  const rows = await db.query(
    `SELECT * FROM product ORDER BY RAND() LIMIT 6`
  );

  return rows;
}

async function getProductByType(values) {

  const rows = await db.query(
    `SELECT * FROM product WHERE type = "${values.type}"`
  );

  const data = helper.emptyOrRows(rows);

  return data;
}

async function getProductById(values) {

  const rows = await db.query(
    `SELECT * FROM product WHERE id = ${values.id}`
  );

  const data = helper.emptyOrRows(rows);

  return data;
}

async function addProduct(data) {
  console.log("toto", data);
  const keys = Object.keys(data).join(",");
  const values = Object.values(data).map(value => `"${value}"`).join(",");

  const result = await db.query(
    `INSERT INTO product (${keys}) VALUES (${values})`
  );

  let message = 'Error while adding new product';

  if (result.affectedRows) {
    message = 'Product added successfully';
  }

  return { message };
}

async function deleteProduct(values) {

  const result = await db.query(
    `DELETE FROM product WHERE id = ${values.id}`
  );

  let message = 'Error while deleting product';

  if (result.affectedRows) {
    message = 'Product deleted succesfully';
  }

  return { message };
}

module.exports = {
  getEveryProduct,
  getProductByType,
  deleteProduct,
  getProductById,
  addProduct,
  randomProducts
}