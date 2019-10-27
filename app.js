const express = require('express')
const userControllers = require('./src/controllers/User');

const app = express()
app.use(express.json())

app.post('/user', userControllers.create);
app.get('/user/:userId', userControllers.find);
// respond with "hello world" when a GET request is made to the homepage
module.exports = app;
//make an express server