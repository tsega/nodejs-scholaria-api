// Load Module Dependencies
var mongoose = require('mongoose');

// Load related models
var Researcher = require('./researcher');
var Subject = require('./subject');

// Define Finding schema
var FindingSchema = mongoose.schema({
    researchers: [{type: mongoose.Schema.ObjectId, ref: 'Researcher'}],
    subjects: [{type: mongoose.Schema.ObjectId, ref: 'Subject'}],
    title: {type: String},
    abstract: {type: String},
    publication_date: {type: Date},
    created_date: {type: Date},
    updated_date: {type: Date}
});

// Export Finding model
module.exports = mongoose.model('Finding', FindingSchema);