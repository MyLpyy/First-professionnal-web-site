const db = require('./db');
const helper = require('../helper');

async function getEveryCustomers() {
    const rows = await db.query(
        `SELECT * FROM customers`
        );
        const data = helper.emptyOrRows(rows);
        
        return data;
}

async function getCustomersById(id) {
    const rows = await db.query(
        `SELECT * FROM customers WHERE customers_id = ${id}`
    );
    const data = helper.emptyOrRows(rows);

    return data;
}

async function addCustomers(customers) {
    const result = await db.query(
        `INSERT INTO customers (name, first_name, phone_number, email, password) 
        VALUES ("${customers.name}", "${customers.first_name}", ${customers.phone_number}, "${customers.email}", "${customers.password}")`
    );

    let message = 'Error while adding new customer';

    if (result.affectedRows) {
        message = 'Customer added successfully';
    }

    return message;
}

/*customer.values -> String("");*/
async function updateCustomers(customer) {
    const result = await db.query(
        `UPDATE customers SET ${customer.updateCol} = "${customer.values}" WHERE customers_id = ${customer.id};`
    );

    let message = 'Error while updating customer';

    if (result.affectedRows) {
        message = 'Customer updated successfully';
    }

    return message;
}

async function deleteCustomers(id) {
    const result = await db.query(
        `DELETE FROM Customers WHERE customers_id = ${id}`
    );

    let message = 'Error while deleting customer';

    if(result.affectedRows) {
        message = 'Customer deleted succesfully';
    }

    return {message};
}

async function setCustomersToken(customer) {
    const result = await db.query(
        `UPDATE customers SET user_token = "${customer.token}" WHERE customers_id = ${customer.id};`
    );

    let message = 'Error while updating customer token';

    if (result.affectedRows) {
        message = 'Customer token updated successfully';
    }

    return message;
}

async function deleteCustomersToken(id) {
    const result = await db.query(
        `UPDATE customers SET user_token = NULL WHERE customers_id = ${id}`
    );

    let message = 'Error while deleting user token';

    if (result.affectedRows) {
        message = 'User token deleted successfully';
    }

    return message;
}

async function getCustomersToken(id) {
    const rows = await db.query(
        `SELECT user_token FROM customers WHERE customers_id = ${id}`
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