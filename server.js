// Dependancies
const express = require('express');
const bodyParser = require('body-parser');
const test = require('./server/middleware/test');

// DB connection
require('./server/models/db');

const app = express();

// Routes
const apiRoutes = require('./server/routes/routers');

// Express
// Configure express to use bodyParser() to get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(test.index);

// Register routes
app.use('/', apiRoutes);

// Start server
app.listen(process.env.PORT || 8080);
