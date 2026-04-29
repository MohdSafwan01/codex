const express = require('express');
const router = express.Router();
const { purchase, getMyPurchases } = require('../controllers/orderController');
const verifyJWT = require('../middleware/authMiddleware');

// All order routes require authentication
router.post('/purchase', verifyJWT, purchase);
router.get('/my-purchases', verifyJWT, getMyPurchases);

module.exports = router;
