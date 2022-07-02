const db = require('./db');
const helper = require('../helper');

async function getEveryCustomers() {

    const rows = await db.query(
        `SELECT * FROM customers`
    );
    const data = helper.emptyOrRows(rows);

    return data;
}

async function getCustomersById(values) {
    const rows = await db.query(
        `SELECT * FROM customers WHERE customers_id = ${values.id}`
    );
    const data = helper.emptyOrRows(rows);

    return data;
}

async function addCustomers(values) {
    const result = await db.query(
        `INSERT INTO customers (name, first_name, phone_number, email, password) 
        VALUES (${values.name}, ${values.first_name}, ${values.phone_number}, ${values.email}, ${values.password})`
    );

    let message = 'Error while adding new customer';

    if (result.affectedRows) {
        message = 'Customer added successfully';
    }

    return message;
}

/*body values entre '' si necessaire*/
async function updateCustomers(values) {
    const result = await db.query(
        `UPDATE customers SET ${values.updateCol} = ${values.value} WHERE customers_id = ${values.id};`
    );

    let message = 'Error while updating customer';

    if (result.affectedRows) {
        message = 'Customer updated successfully';
    }

    return message;
}

async function deleteCustomers(values) {
    const result = await db.query(
        `DELETE FROM customers WHERE customers_id = ${values.id}`
    );

    let message = 'Error while deleting customer';

    if (result.affectedRows) {
        message = `Customer with id ${values.id} deleted succesfully`;
    }

    return { message };
}

async function setCustomersToken(values) {
    const result = await db.query(
        `UPDATE customers SET token = ${values.token} WHERE customers_id = ${values.id};`
    );

    let message = 'Error while updating customer token';

    if (result.affectedRows) {
        message = 'Customer token updated successfully';
    }

    return message;
}

async function deleteCustomersToken(values) {
    const result = await db.query(
        `UPDATE customers SET token = NULL WHERE customers_id = ${values.id}`
    );

    let message = 'Error while deleting user token';

    if (result.affectedRows) {
        message = 'User token deleted successfully';
    }

    return message;
}

async function getCustomersToken(values) {
    const rows = await db.query(
        `SELECT token FROM customers WHERE customers_id = ${values.id}`
    );
    const data = helper.emptyOrRows(rows);

    return data;
}

module.exports = {
    getEveryCustomers,
    getCustomersById,
    addCustomers,
    updateCustomers,
    deleteCustomers,
    setCustomersToken,
    deleteCustomersToken,
    getCustomersToken
}