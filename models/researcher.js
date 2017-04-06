// Load Module Dependencies
var mongoose = require('mongoose');

// Load related models
var Subject = require('./subject');
var Finding = require('./finding');

// Define Researcher schema
var ResearcherSchema = mongoose.schema({
    subjects: [{type: mongoose.Schema.ObjectId, ref: 'Subject'}],
    findings: [{type: mongoose.Schema.ObjectId, ref: 'Finding'}],
    first_name: {type: String},
    last_name: {type: String},
    institution: {type: String},
    orchid_ID: {type: String},
    created_date: {type: Date},
    updated_date: {type: Date}
});

// Export Researcher model
module.exports = mongoose.model('Researcher', ResearcherSchema);