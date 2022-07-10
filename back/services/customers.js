const db = require('./db');
const helper = require('../helper');

async function getEveryCustomers() {
    
    const rows = await db.query(
        `SELECT * FROM customers`
    );
    const data = helper.emptyOrRows(rows);

    return data;
}

async function getCustomersByValues(values) {
    
    const rows = await db.query(
        `SELECT * FROM customers WHERE ${values.col} = '${values.value}'`
    );
    const data = helper.emptyOrRows(rows);

    return data;
}

async function addCustomers(values) {

    const keys = Object.keys(values).join(",");
    const data = Object.values(values).map(value => `'${value}'`).join(",");

    const result = await db.query(
        `INSERT INTO customers (${keys}) VALUES (${data})`
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
        `UPDATE customers SET ${values.updateCol} = ${values.value} WHERE id = ${values.id};`
    );

    let message = 'Error while updating customer';

    if (result.affectedRows) {
        message = 'Customer updated successfully';
    }

    return message;
}

async function deleteCustomers(values) {
    const result = await db.query(
        `DELETE FROM customers WHERE id = ${values.id}`
    );

    let message = 'Error while deleting customer';

    if (result.affectedRows) {
        message = `Customer with id ${values.id} deleted succesfully`;
    }

    return { message };
}

async function setCustomersToken(values) {
    const result = await db.query(
        `UPDATE customers SET token = ${values.token} WHERE id = ${values.id};`
    );

    let message = 'Error while updating customer token';

    if (result.affectedRows) {
        message = 'Customer token updated successfully';
    }

    return message;
}

async function deleteCustomersToken(values) {
    const result = await db.query(
        `UPDATE customers SET token = NULL WHERE id = ${values.id}`
    );

    let message = 'Error while deleting user token';

    if (result.affectedRows) {
        message = 'User token deleted successfully';
    }

    return message;
}

module.exports = {
    getEveryCustomers,
    getCustomersByValues,
    addCustomers,
    updateCustomers,
    deleteCustomers,
    setCustomersToken,
    deleteCustomersToken
}