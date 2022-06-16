const db = require('./db');
const helper = require('../helper');

async function getEveryProduct() {
    const rows = await db.query(
        `SELECT * FROM product`
        );

        const data = helper.emptyOrRows(rows);
        
        return data;
}

async function getProductByType(type) {
    const rows = await db.query(
        `SELECT * FROM product WHERE type = "${type}";`
    );

    const data = helper.emptyOrRows(rows);

    return data;
}

/*fix 'NULL' issue + d'autres trucs*/
async function addProduct(product){

  const result = await db.query(
    `INSERT INTO product (description, img_path, price, name, size, type, genre) 
    VALUES ("${product.description}", "${product.img_path}", ${product.price}, "${product.name}", "${product.size}", "${product.type}", "${product.genre}")`
  );

  let message = 'Error while adding new product';

  if (result.affectedRows) {
    message = 'Product added successfully';
  }

  return {message};
}

async function getProductById(id){
    const rows = await db.query(
        `SELECT * FROM product WHERE product_id = ${id}`
    );

        const data = helper.emptyOrRows(rows);

        return data;
}

async function deleteProduct(id){
    const result = await db.query(
        `DELETE FROM product WHERE product_id = ${id}`
    );

    let message = 'Error while deleting product';

    if(result.affectedRows) {
        message = 'Product deleted succesfully';
    }

    return {message};
}

module.exports = {
  getEveryProduct,
  getProductByType,
  deleteProduct,
  getProductById,
  addProduct
}