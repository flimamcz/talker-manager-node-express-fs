const express = require('express');
const { productsController } = require('../controllers');
const validateProductMiddlewares = require('../middlewares/validateProduct.middleware');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', validateProductMiddlewares, productsController.createProduct);

module.exports = router;