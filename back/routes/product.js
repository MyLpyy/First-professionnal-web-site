const express = require('express');
const router = express.Router();
const product = require('../services/product.js');

router.get('/', async function (req, res, next) {
    try {
        res.json(await product.getEveryProduct());
    } catch (err) {
        console.error(`Error while getting every product `, err.message);
        next(err);
    }
});

router.get('/getByType', async function (req, res, next) {
    try {
        res.json(await product.getProductByType(req.body.type));
    } catch (err) {
        console.error(`Error while getting ${req.body.type} `, err.message);
        next(err);
    }
});

router.get('/getById', async function (req, res, next) {
    try {
        res.json(await product.getProductById(req.body.product_id));
    } catch (err) {
        console.error(`Error while getting ${req.body.id} `, err.message);
        next(err);
    }
});

router.post('/addProduct', async function (req, res, next) {
    console.log(req.body);
    try {
        res.json(await product.addProduct(req.body));
    } catch (err) {
        console.error(`Error while adding new product`, err.message);
        next(err);
    }
});

router.delete('/delete', async function (req, res, next) {
    try {
        res.json(await product.deleteProduct(req.body.id));
    } catch (err) {
        console.error(`Error while deleting product`, err.message);
        next(err);
    }
});

module.exports = router;