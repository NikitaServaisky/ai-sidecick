const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGOURL;

const mongoDB = () => {
    mongoose
    .connect(url)
    .then((res) => console.log(`Connected to MongoDB`))
    .catch((err) => console.log(`DB connection faild ${err}`));
};

module.exports = mongoDB;