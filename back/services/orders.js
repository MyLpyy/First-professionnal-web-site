const db = require('./db.js');
const helper = require('../helper.js');

async function getOrderByStatus(values) {

    const rows = await db.query(
        `SELECT * FROM orders WHERE customers_id = ${values.customers_id} AND order_status = ${values.order_status}`
    );

    const data = helper.emptyOrRows(rows);

    return data;
}

async function getByOrderId(values) {

    const rows = await db.query(
        `SELECT * FROM orders WHERE orders_id = ${values.orders_id}`
    );

    const data = helper.emptyOrRows(rows);

    return data;
}

async function addOrder(values) {

    const result = await db.query(
        `INSERT INTO orders (customers_id)
        VALUES (${values.customers_id})`
    );

    let message = 'Error while adding order';

    if (result.affectedRows) {
        message = 'Order added successfully';
    }

    return message;
}

module.exports = {
    getOrderByStatus,
    getByOrderId,
    addOrder
}