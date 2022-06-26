const express = require('express');
const router = express.Router();
const orders_adresses = require('../services/orders_adresses');

router.get('/get', async function (req, res, next) {
    try {
        res.json(await orders_adresses.getAdresses(req.body));
    } catch (err) {
        console.error(`Error While getting order adresses`, err.message);
        next(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        res.json(await orders_adresses.addAdresses(req.body));
    } catch (err) {
        console.error(`Error while adding order adresses`, err.message);
        next(err);
    }
});

router.delete('/delete', async function (req, res, next) {
    try {
        res.json(await orders_adresses.deleteAdresses(req.body));
    } catch (err) {
        console.error(`Error while delting order adresses`, err.message);
        next(err);
    }
});

module.exports = router;