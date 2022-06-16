const db = require('./db');
const helper = require('../helper');

async function getProductInCart(customers_id) {
    const rows = await db.query(
        `SELECT product_id FROM user_as_products WHERE customers_id = ${customers_id}`
    );
    const data = helper.emptyOrRows(rows);
    
    return data;
}

async function addProductToCart(values) {
    const result = await db.query(
        `INSERT INTO user_as_products (customers_id, product_id) 
        VALUES ("${values.customers_id}", "${values.product_id}")`
    );

    let message = 'Error while adding product to cart';

    if (result.affectedRows) {
        message = 'Product added to cart successfully';
    }

    return message;
}

async function updateCartStatus(values) {
    const result = await db.query(
        `UPDATE user_as_products 
        SET status = ${values.status} WHERE customers_id = ${values.customers_id}`
    );

    let message = 'Error while updating product status';

    if (result.affectedRows) {
        message = 'Product status updated successfully';
    }

    return message;
}

async function deleteProductFromCart(values) {
    const result = await db.query(
        `DELETE FROM user_as_products 
        WHERE customers_id = ${values.customers_id} AND product_id = ${values.product_id} AND status = "WAITING"`
    );

    let message = 'Error while deleting product from cart';

    if (result.affectedRows) {
        message = 'Product deleted successfully from cart';
    }

    return message;
}

async function clearPayedStatus(values) {
    const result = await db.query(
        `DELETE FROM user_as_products
        WHERE customers_id = ${values.customers_id} AND product_id = ${values.product_id} AND status = "PAYED"`
    );

    let message = 'Error while deleting payed product';

    if (result.affectedRows) {
        message = 'Payed product deleted successfully';
    }

    return message;
}

module.exports = {
    addProductToCart,
    getProductInCart,
    updateCartStatus,
    deleteProductFromCart,
    clearPayedStatus
}