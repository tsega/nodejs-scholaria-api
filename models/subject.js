// Load Module Dependencies
var mongoose = require('mongoose');

// Load related models
var Researcher = require('./researcher');
var Finding = require('./finding');

// Define Subject schema
var SubjectSchema = mongoose.schema({
    researchers: [{type: mongoose.Schema.ObjectId, ref: 'Researcher'}],
    findings: [{type: mongoose.Schema.ObjectId, ref: 'Finding'}],
    name: {type: String},
    fieldOfStudy: {type: String},
    created_date: {type: Date},
    updated_date: {type: Date}
});

// Export Subject model
module.exports = mongoose.model('Subject', SubjectSchema);