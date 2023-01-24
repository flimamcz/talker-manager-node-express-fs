const express = require('express');
const { productsController } = require('../controllers');
const { validateProduct } = require('../middlewares');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validateProduct, productsController.createProduct);

module.exports = router;