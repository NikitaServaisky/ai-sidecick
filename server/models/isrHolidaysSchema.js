const mongoose = require('mongoose');

const holidaySchema = new mongoose.Schema({
    date: { type: String, required: true, unique: true },
    hdate: { type: String, },
    title: { type: String, required: true },
    hebrew: { type: String, },
    category: { type: String, },
    subcat: { type: String, },
    leyning: { type: Map, of: String, },
    link: { type: String, },
    memo: { type: String, },
});
module.exports = mongoose.model('HebHolidays', holidaySchema);