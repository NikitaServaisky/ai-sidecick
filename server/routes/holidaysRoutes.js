const express = require('express');
const router = express.Router();
const { fetchAndSaveHolidays, getSavedHolidays } = require('../controllers/fatchHolidaysController')

router.get('/', fetchAndSaveHolidays);
router.get('/list', getSavedHolidays);

module.exports = router;