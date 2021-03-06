const express = require('express');
const router = express.Router();
const customers = require('../services/customers');

router.get('/get', async function (req, res, next) {
    try {
        res.json(await customers.getEveryCustomers());
    } catch (err) {
        console.error(`Error while getting every customers`, err.message);
        next(err);
    }
});

router.get('/getByValues', async function (req, res, next) {
    try {
        res.json(await customers.getCustomersByValues(req.query));
    } catch (err) {
        console.error(`Error while getting customer by id`, err.message);
        next(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        res.json(await customers.addCustomers(req.body));
    } catch (err) {
        console.error(`Error while adding customer`, err.message);
        next(err);
    }
});

router.put('/update', async function (req, res, next) {
    try {
        res.json(await customers.updateCustomers(req.body));
    } catch (err) {
        console.error(`Error while updating customer`, err.message);
        next(err);
    }
});

router.delete('/delete', async function (req, res, next) {
    try {
        res.json(await customers.deleteCustomers(req.body));
    } catch (err) {
        console.error(`Error while deleting customer`, err.message);
        next(err);
    }
});

router.put('/setToken', async function (req, res, next) {
    try {
        res.json(await customers.setCustomersToken(req.body));
    } catch (err) {
        console.error(`Error while setting user token`, err.message);
        next(err);
    }
});

router.delete('/deleteUserToken', async function (req, res, next) {
    try {
        res.json(await customers.deleteCustomersToken(req.body));
    } catch (err) {
        console.error(`Error while deleting user token`, err.message);
        next(err);
    }
});

module.exports = router;