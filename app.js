// Load Module Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');

// Load Custom Validator library
var customValidator = require('./lib/custom_validator');

// Load configuration
var config = require('./config');
var router = require('./routes');

// Connect to mLab MongoDB
mongoose.connect(config.MONGODB_URL);

// Listen to connection success event
mongoose.connection.on('connected', function mLabConnected(err){
    if(err){
        console.log('Connection to mLab failed!');
    }
    console.log('mLab MongoDB connected!');
});

// Listen to connection failed event
mongoose.connection.on('error', function mLabFailed(err){
    console.log('mLab MongoDB unable to connect!\nPlease be sure to provide DB_USER and DB_PASS environment variables.');
});

// Initialize app
var app = express();

// Set Middleware
app.use(bodyParser.json());

// Set Validator
app.use(validator());

// Set Custom Validation
app.use(customValidator());

// Set Routes
router(app);

// Listen to HTTP Port
app.listen(config.HTTP_PORT, function listener() {
    console.log('API Server running on PORT %s', config.HTTP_PORT);
});

module.exports = app;