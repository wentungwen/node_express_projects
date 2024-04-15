const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/add-product', adminController.getAddProduct);
router.get('/product', adminController.getAddProduct);
router.post('/add-product', adminController.postAddProduct);

module.exports = router;
