const express = require('express');
const router = express.Router();
const customers = require('../services/customers.js');

router.get('/', async function (req, res, next) {
    try {
        res.json(await customers.getEveryCustomers());
    } catch (err) {
        console.error(`Error while getting every customers`, err.message);
        next(err);
    }
});

router.get('/getById', async function (req, res, next) {
    try {
        res.json(await customers.getCustomersById(req.body.customers_id));
    } catch (err) {
        console.error(`Error while getting customer by id`, err.message);
        next(err);
    }
});

router.post('/addCustomer', async function (req, res, next) {
    try {
        res.json(await customers.addCustomers(req.body));
    } catch (err) {
        console.error(`Error while adding customer`, err.message);
        next(err);
    }
});

router.put('/updateCustomer', async function (req, res, next) {
    try {
        res.json(await customers.updateCustomers(req.body));
    } catch (err) {
        console.error(`Error while updating customer`, err.message);
        next(err);
    }
});

router.delete('/deleteCustomer', async function (req, res, next) {
    try {
        res.json(await customers.deleteCustomers(req.body.customers_id));
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

router.get('/getUserToken', async function (req, res, next) {
    try {
        res.json(await customers.getCustomersToken(req.body.customers_id));
    } catch (err) {
        console.error(`Error while getting user token`, err.message);
        next(err);
    }
});

router.delete('/deleteUserToken', async function (req, res, next) {
    try {
        res.json(await customers.deleteCustomersToken(req.body.customers_id));
    } catch (err) {
        console.error(`Error while deleting user token`, err.message);
        next(err);
    }
});

module.exports = router;