require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const GetProductService = require('./services/product/getProductService');

mongoose.connect('mongodb://localhost:27017/studentsLabDB').then(() => {
    console.log('Database is running');
}).catch(err => console.error(err));

app.get('/products', GetProductService);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});