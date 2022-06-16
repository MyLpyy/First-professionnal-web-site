const express = require('express');
const router = express.router();
const user_as_products = require('../services/user_as_products.js');
const { use } = require('./product');

router.get('/getProductInCart', async function (req, res, next) {
    try {
        res.json(await user_as_products.getProductInCart(req.body.id));
    } catch (err) {
        console.error(`Error while getting product in cart`, err.message);
        next(err);
    }
});

router.post('/addProductToCart', async function (req, res, next) {
    try {
        res.json(await user_as_products.addProductToCart(res.body));
    } catch (err) {
        console.error(`Error while adding product in cart`, err.message);
        next(err);
    }
});

router.put('/updateCartStatus', async function (req, res, next) {
    try {
        res.json(await user_as_products.updateCartStatus(req.body));
    } catch (err) {
        console.error(`Error while updating product status`, err.message);
        next(err);
    }
});

router.delete('/deleteProductFromCart', async function (req, res, next) {
    try {
        res.json(await user_as_products.deleteProductFromCart(req.body));
    } catch (err) {
        console.error(`Error while deleting product from cart`, err.message);
        next(err);
    }
});

router.delete('/clearPayedStatus', async function (req, res, next) {
    try {
        res.json(await user_as_products.clearPayedStatus(req.body));
    } catch (err) {
        console.error(`Error while deleting payed product`, err.message);
        next(err);
    }
});

module.exports = router;