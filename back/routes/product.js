const express = require('express');
const router = express.Router();
const product = require('../services/product');

router.get('/get', async function (req, res, next) {
    try {
        res.json(await product.getEveryProduct());
    } catch (err) {
        console.error(`Error while getting every product`, err.message);
        next(err);
    }
});

router.get('/getByType', async function (req, res, next) {
    try {
        res.json(await product.getProductByType(req.body));
    } catch (err) {
        console.error(`Error while getting product by type ${req.body.type}`, err.message);
        next(err);
    }
});

router.get('/getById', async function (req, res, next) {
    try {
        res.json(await product.getProductById(req.body));
    } catch (err) {
        console.error(`Error while getting product by id `, err.message);
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
        res.json(await product.deleteProduct(req.body));
    } catch (err) {
        console.error(`Error while deleting product`, err.message);
        next(err);
    }
});

module.exports = router;