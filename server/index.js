require("dotenv").config();
const express = require("express");
const authRoutes = require('./routes/authRoutes');
const port = process.env.PORT || 5000;
const connectDB = require('./config/dbConfig');
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/users', authRoutes),

app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
}) 

connectDB();