const db = require('./db');
const helper = require('../helper');

async function getAdresses(values) {

    const rows = await db.query(
        `SELECT * FROM orders_adresses WHERE orders_id = ${values.orders_id}`
    );

    const data = helper.emptyOrRows(rows);

    return data;
}

async function addAdresses(values) {

    const result = await db.query(
        `INSERT INTO orders_adresses (orders_id, customers_id, adresse, postal_code, city)
        VALUES (${values.orders_id}, ${values.customers_id}, "${values.adresse}", ${values.postal_code}, "${values.city}")`
    );

    let message = 'Error while adding new order adresses';

    if (result.affectedRows) {
        message = 'Order adresses added successfully';
    }

    return { message };
}

async function deleteAdresses(values) {

    const result = await db.query(
        `DELETE FROM orders_adresses WHERE orders_id = ${values.orders_id}`
    );

    let message = 'Error while deleting new order adresses';

    if (result.affectedRows) {
        message = 'Order adresses deleted successfully';
    }

    return { message };
}

module.exports = {
    getAdresses,
    addAdresses,
    deleteAdresses
}