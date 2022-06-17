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
        `SELECT * FROM`
    );

    const data = helper.emptyOrRows(rows);

    return data;
}

module.exports = {
    getOrderByStatus
}