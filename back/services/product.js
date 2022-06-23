const db = require('./db');
const helper = require('../helper');

async function getEveryProduct() {

  const rows = await db.query(
    `SELECT * FROM product`
  );

  const data = helper.emptyOrRows(rows);

  return data;
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
    `SELECT * FROM product WHERE product_id = ${values.id}`
  );

  const data = helper.emptyOrRows(rows);

  return data;
}

/*fix 'NULL' issue + d'autres trucs*/
async function addProduct(values) {

  const result = await db.query(
    `INSERT INTO product (description, img_path, price, name, size, type, genre) 
    VALUES ("${values.description}", "${values.img_path}", ${values.price}, "${values.name}", "${values.size}", "${values.type}", "${values.genre}")`
  );

  let message = 'Error while adding new product';

  if (result.affectedRows) {
    message = 'Product added successfully';
  }

  return { message };
}

async function deleteProduct(values) {

  const result = await db.query(
    `DELETE FROM product WHERE product_id = ${values.id}`
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
  addProduct
}