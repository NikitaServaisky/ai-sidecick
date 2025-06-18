require("dotenv").config();

const express = require("express");
const connectDB = require('./config/dbConfig');
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const holidaysRoutes = require('./routes/holidaysRoutes');
const runHolidayCheck = require("./cron/holidayScheduler");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/', authRoutes);
app.use('/holidays', holidaysRoutes)

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
}) 

connectDB();
require('./cron/holidayScheduler');