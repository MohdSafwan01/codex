const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const verifyJWT = require('../middleware/authMiddleware');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', verifyJWT, getMe);

module.exports = router;
