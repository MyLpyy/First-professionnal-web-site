const express = require('express');
const router = express.Router();
const user_as_products = require('../services/user_as_products');

router.get('/get', async function (req, res, next) {
    try {
        res.json(await user_as_products.get(req.body));
    } catch (err) {
        console.error(`Error while getting product`, err.message);
        next(err);
    }
});

router.get('/getByStatus', async function (req, res, next) {
    try {
        res.json(await user_as_products.getByStatus(req.body));
    } catch (err) {
        console.error(`Error while getting product`, err.message);
        next(err);
    }
});

router.post('/add', async function (req, res, next) {
    try {
        res.json(await user_as_products.add(req.body));
    } catch (err) {
        console.error(`Error while adding product in cart`, err.message);
        next(err);
    }
});

router.put('/update', async function (req, res, next) {
    try {
        res.json(await user_as_products.update(req.body));
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
});

router.put('/updateOrder', async function (req, res, next) {
    try {
        res.json(await user_as_products.updateOrder(req.body));
    } catch (err) {
        console.error(`Error while updating product`, err.message);
        next(err);
    }
});

router.delete('/delete', async function (req, res, next) {
    try {
        res.json(await user_as_products.deleteProduct(req.body));
    } catch (err) {
        console.error(`Error while deleting product`, err.message);
        next(err);
    }
});

router.delete('/deleteOrder', async function (req, res, next) {
    try {
        res.json(await user_as_products.deleteOrder(req.body));
    } catch (err) {
        console.error(`Error while deleting product`, err.message);
        next(err);
    }
})

module.exports = router;