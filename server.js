// Dependancies
const express = require('express');
const bodyParser = require('body-parser');
// DB connection
require('./server/models/db');

const app = express();

// Routes
const index = require('./server/routes/routers');

// Express
// Configure express to use bodyParser() to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
app.use('/', index);

// Start server
app.listen(process.env.PORT || 8080);
