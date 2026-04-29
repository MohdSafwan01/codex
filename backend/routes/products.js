const express = require('express');
const router = express.Router();
const { getAllProducts, getProduct, createProduct } = require('../controllers/productController');
const verifyJWT = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// Admin route (JWT protected)
router.post('/', verifyJWT, createProduct);

module.exports = router;
