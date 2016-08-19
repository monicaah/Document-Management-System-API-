// Dependancies
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Routes
const index = require('./server/routes/index');

// Express
// Configure express to use bodyParser() to get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
app.use('/', index);

// Start server
app.listen(process.env.PORT || 8080);
