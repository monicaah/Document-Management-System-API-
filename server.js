// Dependancies
const express = require('express');
const bodyParser = require('body-parser');
const test = require('./server/middleware/test');

// DB connection
require('./server/models/db');

const app = express();

// Configure express to use bodyParser() to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const apiRoutes = require('./server/routes/routers');


// Middleware
app.use(test.index);

// Register routes
app.use('/', apiRoutes);

module.exports = app;
