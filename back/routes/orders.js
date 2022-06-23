const express = require('express');
const router = express.Router();
const orders = require('../services/orders');

router.get('/get', async function (req, res, next) {
    try {
        res.json(await orders.getOrder(req.body));
    } catch (err) {
        console.error(`Error While getting order`, err.message);
        next(err);
    }
});

router.get('/getById', async function (req, res, next) {
    try {
        res.json(await orders.getByOrderId(req.body));
    } catch (err) {
        console.error(`Error while getting order`, err.message)
        next(err);
    }
});

router.get('/getByStatus', async function (req, res, next) {
    try {
        res.json(await orders.getOrderByStatus(req.body));
    } catch (err) {
        console.error(`Error While getting order`, err.message);
        next(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        res.json(await orders.addOrder(req.body));
    } catch (err) {
        console.error(`Error While adding order`, err.message);
        next(err);
    }
});

router.put('/update', async function (req, res, next) {
    try {
        res.json(await orders.updateOrder(req.body));
    } catch (err) {
        console.error(`Error While updating order`, err.message);
        next(err);
    }
});

router.delete('/delete', async function (req, res, next) {
    try {
        res.json(await orders.deleteOrder(req.body));
    } catch (err) {
        console.error(`Error While deleting order`, err.message);
        next(err);
    }
});

module.exports = router;