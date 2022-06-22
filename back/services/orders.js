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

async function getOrder(values) {

    const rows = await db.query(
        `SELECT * FROM orders WHERE customers_id = ${values.customers_id}`
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

async function updateOrder(values) {

    const result = await db.query(
        `UPDATE orders
        SET status = ${values.status} WHERE customers_id = ${values.customers_id}`
    );

    let message = 'Error while updating order';

    if (result.affectedRows) {
        message = 'Order updated successfully';
    }

    return message;
}

async function deleteOrder(values) {

    const result = await db.query(
        `DELETE FROM orders
        WHERE orders_id = ${values.orders_id}`
    );

    let message = 'Error while deleting order';

    if (result.affectedRows) {
        message = 'Order deleted successfully';
    }

    return message;
}

module.exports = {
    getOrderByStatus,
    getByOrderId,
    getOrder,
    addOrder,
    updateOrder,
    deleteOrder
}