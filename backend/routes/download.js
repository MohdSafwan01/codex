const express = require('express');
const router = express.Router();
const { downloadProduct } = require('../controllers/downloadController');
const verifyJWT = require('../middleware/authMiddleware');

// JWT protected download route
router.get('/:productId', verifyJWT, downloadProduct);

module.exports = router;
