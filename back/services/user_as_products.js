const db = require('./db');
const helper = require('../helper');

async function get(values) {
    const rows = await db.query(
        `SELECT * FROM user_as_products WHERE customers_id = ${values.id}`
    );
    const data = helper.emptyOrRows(rows);
    
    return data;
}

async function add(values) {
    const result = await db.query(
        `INSERT INTO user_as_products (customers_id, product_id) 
        VALUES (${values.customers_id}, ${values.product_id})`
    );

    let message = 'Error while adding product to cart';

    if (result.affectedRows) {
        message = 'Product added to cart successfully';
    }

    return message;
}

async function update(values) {
    const result = await db.query(
        `UPDATE user_as_products 
        SET ${values.updateCol} = ${values.value} WHERE customers_id = ${values.customers_id}`
    );

    let message = 'Error while updating product status';

    if (result.affectedRows) {
        message = 'Product status updated successfully';
    }

    return message;
}

async function deleteProduct(values) {
    const result = await db.query(
        `DELETE FROM user_as_products 
        WHERE customers_id = ${values.customers_id} AND product_id = ${values.product_id} AND status = ${values.status}`
    );

    let message = 'Error while deleting';

    if (result.affectedRows) {
        message = 'Product deleted successfully';
    }

    return message;
}

async function deleteOrder(values) {
    const result = await db.query(
        `DELETE FROM user_as_products
        WHERE customers_id = ${values.customers_id} AND order_id = ${values.order_id} AND status = 'PAYED'`
    );

    let message = 'Error while deleting';

    if (result.affectedRows) {
        message = 'Payed product deleted successfully';
    }

    return message;
}

module.exports = {
    add,
    get,
    update,
    deleteProduct,
    deleteOrder
}