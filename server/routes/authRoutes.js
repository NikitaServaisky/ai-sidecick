const express = require('express');
const { userRegistration } = require('../controllers/authController');
const router = express.Router();

router.post('/registration', userRegistration);

module.exports = router;