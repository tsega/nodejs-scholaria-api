// Load Module Dependencies
var express = require('express');

// Load Routers
var researcherRouter = require('./researcher');
var subjectRouter = require('./subject');
var findingRouter = require('./finding');

// Export Router Initializer
module.exports = function iniRouter(app) {
    // Researcher Endpoint
    app.use('/researchers', researcherRouter);
    // Subject Endpoint
    app.use('/subjects', subjectRouter);
    // Finding Endpoint
    app.use('/findings', findingRouter);
};