// Load Module Dependencies
var mongoose = require('mongoose');

// Load configuration
var config = require('./config');

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
